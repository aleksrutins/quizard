import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Quizard" },
    { name: "description", content: "An unobtrusive study platform." },
  ];
};

export default function Index() {
  return (
    <div>
      <header className="border-b border-stone-400 pb-3 mb-5 flex flex-row justify-between items-center text-stone-800 dark:text-stone-300">
        <h1 className="text-5xl font-display font-bold tracking-tighter">Quizard</h1>
        <a href="/app" className="header-button">
          <span>Log In</span>
          <ArrowUpRightIcon className="icon"/>
        </a>
      </header>
      <main>
        <h2 className="font-display text-lg pb-2">Study tools that work.</h2>
        <p>Quizard has no ads, no paywalls, no nothing. Just get to studying.</p>
      </main>
    </div>
  );
}
