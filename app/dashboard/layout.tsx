import NavBar from "@/components/nav-bar"
import { auth } from "@/lib/auth"
import { Separator } from "@/components/ui/separator"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <section>
      <NavBar />
      <Separator orientation="horizontal"/>
      <main>
        {children}
      </main>
    </section>
  )
}