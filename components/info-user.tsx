import Image from "next/image"
import { auth } from "@/lib/auth"

export default async function InfoUser() {
    const session = await auth()
    return (
        <p className="text-xl flex items-center gap-2">
            <Image className="rounded-full" src={session?.user?.image!} alt="user" width={40} height={40} />
            {session?.user?.name}
        </p>
    )
}