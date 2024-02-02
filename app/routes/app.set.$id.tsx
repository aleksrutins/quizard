import { useUser } from "@clerk/remix";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import PageHeader from "~/components/page-header";
import FlashCards from "~/components/study/flashcards";
import { DBEnv, db } from "~/db/db.server";
import { Set, Term, sets, terms } from "~/db/schema.server";

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

export default function SetView() {
    const data = useLoaderData<typeof loader>();
    const { user } = useUser();

    return <>
        <PageHeader title={data.set.name}/>
        <div className="flex flex-row justify-between items-center border border-stone-400 dark:border-stone-600 bg-stone-300 dark:bg-stone-700 rounded-lg px-3 py-2">
            <span className="block py-2">{data.terms.length} terms</span>
            {data.set.creator == user?.id && <a className="btn primary block" href={`/app/set/${data.set.id}/edit`}>Edit Set</a>}
        </div>
        <FlashCards terms={data.terms}/>
    </>
}