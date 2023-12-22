import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { eq } from "drizzle-orm";
import { DBEnv, db } from "~/db/db";
import { sets } from "~/db/schema";

export async function loader(args: LoaderFunctionArgs) {
    return (await db(args.context.env as DBEnv)
        .select()
        .from(sets)
        .where(eq(sets.id, parseInt(args.params.id!))))[0];
}