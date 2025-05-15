"use client"

import { User2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

import InfoUser from "./info-user"

export default function UserOptions() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(!open)}>
        <User2Icon />
      </Button>
      {
        open && (
          <article className={`flex flex-col gap-2 p-4 border rounded-md absolute top-14 right-1`}>
          </article>
        )
      }
    </>
  )
}