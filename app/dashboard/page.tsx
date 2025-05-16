import { auth } from "@/auth";
import SignOut from "@/components/auth/sing-out";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <p>Logged in as {session?.user?.email}</p>
      <SignOut />
    </div>
  )
}