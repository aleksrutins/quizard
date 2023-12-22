import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { DBEnv, db } from "./db.server";

await migrate(db(process.env as unknown as DBEnv), { migrationsFolder: './drizzle' });