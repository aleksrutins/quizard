import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from './schema.server';

export type DBEnv = { DATABASE_URL?: string, DATABASE_AUTH_TOKEN?: string };

export const conn = (env: DBEnv) => createClient({ url: env.DATABASE_URL?.trim() ?? 'file:dev.db', authToken: env.DATABASE_AUTH_TOKEN?.trim() });
export const db = (env: DBEnv) => drizzle(conn(env), { schema });