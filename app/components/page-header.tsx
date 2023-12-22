import { UserButton } from "@clerk/remix";
import { FC, ReactNode } from "react";

export default (({ title, children }) => {
    return <div className="w-full flex flex-row justify-between items-center mb-5">
        <h1 className="text-2xl font-display">{title}</h1>
        <div className="flex flex-row items-center gap-2">
            {children}
            <div className="overflow-hidden h-8 w-8 rounded-full bg-stone-300">
                <UserButton/>
            </div>
        </div>
    </div>
}) satisfies FC<{title: string, children?: ReactNode}>;