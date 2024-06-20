import { PageProps } from "$fresh/server.ts";

export default function AuthLayout({ Component }: PageProps) {
    return (
        <div class="flex flex-col items-center justify-center h-screen bg-stone-100">
            <div class="bg-white rounded-lg p-8 shadow-lg flex flex-col items-stretch gap-6">
                <img class="mx-auto" src="/logo.svg" width="64" height="64" alt="the Fresh logo: a sliced lemon dripping with juice" />
                <Component />
            </div>
        </div>
    )
}