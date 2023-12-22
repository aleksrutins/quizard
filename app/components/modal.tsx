import { FC, ReactNode } from "react";

export default (({ open, children }) => {
    return <dialog open={open} className="transition-opacity w-dvw h-dvh fixed top-0 left-0 items-center justify-center bg-stone-500/50" style={{ display: open ? 'flex' : 'none', opacity: open ? 1 : 0 }}>
        <div className="bg-stone-200 dark:bg-stone-800 rounded-lg p-6 shadow-md transition-opacity" style={{opacity: open ? 1 : 0 }}>
            {children}
        </div>
    </dialog>
}) satisfies FC<{ open: boolean, children: ReactNode }>