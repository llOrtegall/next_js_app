import { auth } from "@/lib/auth";
import SignIn from "@/components/sing-in";
import SingOut from "@/components/sing-out";

export default async function Home() {
  const session = await auth()

  return (
    <section>
      {session ? (
        <div>
          <p>welcome {session.user?.name}</p>
          <SingOut />
        </div>
      ) : (
        <SignIn />
      )}
    </section>
  );
}
