import { sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const contentType = ["text", "math"] as const;

export type ContentType = (typeof contentType)[number];

export const sets = sqliteTable('sets', {
    id: int('id').primaryKey({ autoIncrement: true }),

    name: text('name'),
    creator: text('creator'),
    description: text('description'),
    createdAt: int('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
}, table => ({
    nameIdx: index('name_idx').on(table.name),
    descriptionIdx: index('description_idx').on(table.description),
    creatorIdx: index('creator_idx').on(table.creator)
}))

export const terms = sqliteTable('terms', {
    id: int('id').primaryKey({ autoIncrement: true }),
    setId: int('set_id').references(() => sets.id, { onUpdate: 'cascade', onDelete: 'cascade' }),

    termType: text('term_type', { enum: contentType }),
    term: text('term'),

    definitionType: text('definition_type',  { enum: contentType }),
    definition: text('definition')
})