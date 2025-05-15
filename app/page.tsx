import DashboarPage from "@/app/dashboard";
import LoginPage from "./login/page";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth()

  return (
    <section>
      {session ? (
        <DashboarPage />
      ) : (
        <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <LoginPage />
        </section>
      )}
    </section>
  );
}
