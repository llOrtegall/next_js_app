import { signOut } from "@/lib/auth";

export default function SingOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  )
}
