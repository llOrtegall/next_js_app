import UserOptions from "./user-options"
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function NavBar() {
  const session = await auth()
  return (
    <header className="flex">
      <nav className="flex gap-2 justify-between items-center p-2 w-full">
        <ul className="flex gap-2">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/dashboard/articles">Articles</Link></li>
          <li><Link href="/dashboard/notes">Notes</Link></li>
        </ul>

        <UserOptions />
      </nav>
    </header>
  )
}
