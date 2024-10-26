'use client';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Image from 'next/image';

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className='space-y-2 bg-blue-800 flex justify-around items-center p-4'>
      <figure>
        <p className='text-2xl font-medium text-yellow-300'>Mern Chat</p>
      </figure>
      {
        session ? (
          <div className='flex items-center gap-4'>
            <Image
              className='rounded-full'
              src={session.user?.image || '/default-avatar.png'}
              alt={session.user?.name || 'User Avatar'}
              width={30}
              height={30}
            />
            <button className='bg-red-600 px-2 py-1 rounded-md text-white' onClick={() => signOut()} >
              Sign Out
            </button>
          </div>
        ) : (
          <button className='bg-green-600 px-2 py-1 rounded-md text-white font-semibold'
            onClick={() => signIn('google')} >
            Sign In Google
          </button>
        )
      }
    </header>
  );
}