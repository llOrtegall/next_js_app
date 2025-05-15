import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";

export default function SingOut() {
  return (
    <form action={async() => {
      "use server"
      await signOut()
    }}>
      <Button type="submit" variant="outline">Sign out</Button>
    </form>
  );
}
