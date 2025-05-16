import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()

  if (session) {
    return redirect("/dashboard")
  } else {
    return redirect("/login")
  }
}
