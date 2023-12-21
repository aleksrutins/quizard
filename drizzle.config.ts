import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  driver: process.env.NODE_ENV == 'development' ? 'libsql' : 'turso', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:dev.db',
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
} satisfies Config;