import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth"

export const OPTIONSAUTH: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  jwt: { secret: process.env.NEXTAUTH_SECRET as string },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ]
}

const handler = NextAuth(OPTIONSAUTH)

export { handler as GET, handler as POST }