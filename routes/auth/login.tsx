import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../components/Button.tsx";
import { Input } from "../../components/Input.tsx";
import { checkUser, createSession } from "../../lib/auth.ts";

interface Props {
    message?: string;
}

export const handler: Handlers = {
    async GET(req, ctx) {
        return await ctx.render({
            message: null,
        });
    },
    async POST(req, ctx) {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();

        if (await checkUser(email, password)) {
            const headers = new Headers();
            headers.set("location", "/app");
            await createSession(email!, headers);

            return new Response(null, { status: 303, headers });
        }

        return await ctx.render({ message: "Invalid email or password" });
    },
};

export default function LogIn({ data: { message } }: PageProps<Props>) {
    return <>
        <h1 class="text-2xl font-bold self-center">Log In</h1>

        <form class="w-full flex flex-col items-stretch text-center gap-2" method="POST">
            <label class="block">
                <span>Email</span>
                <Input type="email" name="email" class="w-full" required />
            </label>
            <label class="block">
                <span>Password</span>
                <Input type="password" name="password" class="w-full" required />
            </label>
            <Button type="submit" class="w-full mt-3" variant="primary">Log In</Button>
            <Button type="submit" formAction="/signup" formMethod="GET" class="w-full" variant="secondary">Sign Up</Button>
        </form>
    </>;
}
