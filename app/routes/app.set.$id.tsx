import { useUser } from "@clerk/remix";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import PageHeader from "~/components/page-header";
import { DBEnv, db } from "~/db/db";
import { sets, terms } from "~/db/schema";

type Set = typeof sets.$inferSelect;
type Term = typeof terms.$inferSelect;

export async function loader(args: LoaderFunctionArgs) {
    return (await db(args.context.env as DBEnv)
        .select()
        .from(sets)
        .where(eq(sets.id, parseInt(args.params.id!)))
        .leftJoin(terms, eq(terms.setId, sets.id)))
        .reduce<{ set: Set, terms: Term[] }>((acc, row) => {
            if(!acc.set) acc.set = row.sets;
            if(row.terms) acc.terms.push(row.terms);
            return acc;
        }, { set: null!, terms: [] });
}

export default function Set() {
    const data = useLoaderData<typeof loader>();
    const { user } = useUser();

    return <>
        <PageHeader title={data.set.name}/>
        <div className="flex flex-row justify-between items-center border border-stone-400 bg-stone-300 rounded-lg px-3 py-2">
            <span className="block py-2">{data.terms.length} terms</span>
            {data.set.creator == user?.id && <a className="btn primary block" href={`/app/set/${data.set.id}/edit`}>Edit Set</a>}
        </div>
    </>
}