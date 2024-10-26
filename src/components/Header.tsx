'use client';
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header>
      {
        session ? (
          <p>Signed in as {session.user?.email}</p>
        ) : (
          <button onClick={() => signIn('google')}>Sign In</button>
        )
      }
      <button onClick={() => signOut()}>Sign Out</button>
    </header>
  )
}