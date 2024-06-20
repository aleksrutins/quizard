import { JSX } from 'preact';

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
    return (
      <input
        {...props}
        class={`${props.class} px-3 py-2 border border-gray-200 focus:border-gray-300 rounded`}
      />
    );
  }
  