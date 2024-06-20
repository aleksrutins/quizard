import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export type Props = {
  variant?: 'primary' | 'secondary';
}

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`${props.class} cursor-pointer px-3 py-2 border-gray-500 rounded ${props.variant == 'primary' ? 'bg-orange-100 hover:bg-orange-200' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
    />
  );
}
