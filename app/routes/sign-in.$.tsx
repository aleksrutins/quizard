import { SignIn } from "@clerk/remix";
 
export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-dvh w-dvw bg-gradient-to-br from-blue-800 to-fuchsia-800">
      <SignIn />
    </div>
  );
}