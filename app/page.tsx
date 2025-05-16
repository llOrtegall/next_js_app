import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import SignOut from "@/components/auth/sing-out";
import SignIn from "@/components/auth/sing-in";

export default async function Home() {
  const session = await auth()

  return (
    <div className="p-2">
      {session ? (
        <div>
          <p>Logged in as {session.user?.email}</p>
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
