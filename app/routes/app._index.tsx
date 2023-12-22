import { getAuth } from "@clerk/remix/ssr.server"
import { PlusIcon } from "@heroicons/react/16/solid"
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import { Form, useLoaderData } from "@remix-run/react"
import { eq } from "drizzle-orm"
import { useState } from "react"
import { z } from "zod"
import Modal from "~/components/modal"
import PageHeader from "~/components/page-header"
import { DBEnv, db } from "~/db/db"
import { sets } from "~/db/schema"

export async function loader(args: LoaderFunctionArgs) {
    const { userId } = await getAuth(args);
    if(!userId) return [];
    return await db(args.context.env as DBEnv).select()
        .from(sets)
        .where(eq(sets.creator, userId))

}

export default function Home() {
    const sets = useLoaderData<typeof loader>();
    const [createSetOpen, setCreateSetOpen] = useState(false);
    return <>
        <PageHeader title="My Sets">
            <button onClick={() => setCreateSetOpen(true)} className="header-button">
                <span>Add Set</span>
                <PlusIcon className="icon"/>
            </button>
        </PageHeader>

        <div className="flex flex-row flex-wrap gap-3">
            {sets.map(set => 
                <a href={`/app/set/${set.id}`} className="block border border-stone-500 rounded-md p-3" key={set.id}>
                    <h3 className="font-display">{set.name}</h3>
                    <p>{set.description}</p>
                </a>
            )}
        </div>

        <Modal open={createSetOpen}>
            <h2 className="font-display font-bold pb-3">Create Set</h2>
            <Form action="" method="post" onSubmit={() => setCreateSetOpen(false)} className="flex flex-col gap-2">
                <input type="text" placeholder="Name" className="rounded-md bg-transparent border border-stone-500 px-2 py-1" name="name"/>
                <textarea name="description" className="rounded-md bg-transparent border border-stone-500 px-2 py-1" placeholder="Description"/>
                <div className="flex flex-row justify-between">
                    <button className="btn" type="button" onClick={() => setCreateSetOpen(false)}>Cancel</button>
                    <button className="btn primary" type="submit">Create</button>
                </div>
            </Form>
        </Modal>
    </>
}

export async function action(args: ActionFunctionArgs) {
    const { userId } = await getAuth(args);
    if(!userId) return json({ ok: false }, 403);

    const formData = z.object({
        name: z.string(),
        description: z.string()
    }).parse(Object.fromEntries(await args.request.formData()));

    await db(args.context.env as DBEnv)
        .insert(sets)
        .values({
            creator: userId,
            ...formData
        })
    return json({ ok: true });
}