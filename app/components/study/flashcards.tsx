import { useState } from "react"
import { Term } from "~/db/schema.server"

export default function FlashCards({ terms }: { terms: Term[] }) {
    const [activeTerm, setActiveTerm] = useState(0)

    return <div className="rounded-lg flex flex-column items-center justify-center shadow-lg p-36">
        <h1 className="text-xl font-bold">{terms[activeTerm]?.term ?? 'No Terms'}</h1>
    </div>
}