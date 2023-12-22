import { UserButton } from "@clerk/remix";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useLocation } from "@remix-run/react";
import { FC, ReactNode } from "react";

export default (({ title, children }) => {
    const loc = useLocation();

    return <div className="w-full flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row items-center gap-3">
            { loc.pathname != '/app' && <a href="/app" className="block"><HomeIcon className="h-8 w-8"/></a> }
            <h1 className="text-2xl font-display">{title}</h1>
        </div>
        <div className="flex flex-row items-center gap-2">
            {children}
            <div className="overflow-hidden h-8 w-8 rounded-full bg-stone-300">
                <UserButton/>
            </div>
        </div>
    </div>
}) satisfies FC<{title: string, children?: ReactNode}>;