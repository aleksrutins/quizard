import { db } from "../db/db.ts";
import { setCookie, getCookies, signCookie, verifyCookie, parseSignedCookie } from "@std/http";
import { Logger } from '@asr/waterlog';
import { Result } from '@asr/result';

const logger = new Logger('auth');

const signingKey = getSigningKey();

export async function getSigningKey(): Promise<CryptoKey> {
    try {
        if(signingKey) return signingKey;
    } catch(_) {/* Ignore error */}
    const hmacOptions = { name: 'HMAC', hash: 'SHA-256' };
    const usages: KeyUsage[] = ['sign', 'verify'];

    const keyData = (await (await db).get<ArrayBuffer>(['internal', 'signing-key'])).value;
    if(keyData != null) return await crypto.subtle.importKey('raw', keyData, hmacOptions, true, usages);

    logger.info('No signing key found, generating a new one');

    const newKey = await crypto.subtle.generateKey(hmacOptions, true, usages) as CryptoKey;

    await (await db).set(['internal', 'signing-key'], await crypto.subtle.exportKey('raw', newKey));

    return newKey;
}

async function encryptPassword(pass: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(pass);
    return await crypto.subtle.digest('SHA-256', data);
}

function bufEquals(a: ArrayBuffer, b: ArrayBuffer): boolean {
    const aView = new DataView(a), bView = new DataView(b);

    if(aView.byteLength != bView.byteLength) return false;

    for(let i = 0; i < aView.byteLength; i++) {
        if(aView.getUint8(i) != bView.getUint8(i)) return false;
    }

    return true;
}

export async function createUser(email: string, password: string): Promise<boolean> {
    if((await (await db).get(['user', email, 'password'])).value != null) return false;

    await (await db).set(['user', email, 'password'], await encryptPassword(password));

    return true;
}

export async function checkUser(email?: string, password?: string): Promise<boolean> {
    if(!email || !password) return false;
    const dbPassword = (await (await db).get<ArrayBuffer>(['user', email, 'password'])).value;
    if(!dbPassword) return false;

    return bufEquals(dbPassword, await encryptPassword(password))
}

export async function createSession(email: string, headers: Headers) {
    const value = await signCookie(email, await signingKey);

    setCookie(headers, {
        name: "session",
        value
    });
}

/**
 * Verifies the session cookie in the provided headers.
 * @returns The signed-in email if the session is valid, otherwise an error message
 */
export async function verifySession(headers: Headers): Promise<Result<string, string>> {
    const sessionCookie = getCookies(headers)["session"];

    if(!sessionCookie) return Result.error('No session cookie found');
    if(!await verifyCookie(sessionCookie, await signingKey)) return Result.error('Invalid session cookie');
    return Result.ok(parseSignedCookie(sessionCookie));
}