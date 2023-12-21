import { FC, ReactNode } from "react";

export default (({ open, children }) => {
    return <dialog open={open} className="w-dvw h-dvh fixed top-0 left-0 items-center justify-center bg-stone-500/50" style={{ display: open ? 'flex' : 'none' }}>
        <div className="bg-stone-200 dark:bg-stone-800 rounded-lg p-6 shadow-md">
            {children}
        </div>
    </dialog>
}) satisfies FC<{ open: boolean, children: ReactNode }>