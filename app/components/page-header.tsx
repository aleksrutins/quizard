import { UserButton } from "@clerk/remix";
import { FC, ReactNode } from "react";

export default (({ title, children }) => {
    return <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-2xl font-display">{title}</h1>
        <div className="flex flex-row items-center gap-2">
            {children}
            <UserButton/>
        </div>
    </div>
}) satisfies FC<{title: string, children?: ReactNode}>;