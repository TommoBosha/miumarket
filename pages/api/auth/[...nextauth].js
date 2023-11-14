import NextAuth from "next-auth/next";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcryptjs from "bcryptjs";
import CredentiasProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";


export default NextAuth({

    session: {
        strategy: 'jwt',
        user: {
            email: 'user.email',
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            if (user?.email) token.email = user.email;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            if (token?.email) session.user.email = token.email;
            return session;
        },
        async signIn(user, account, profile) {
            if (account && account.provider === "google") {

                user.name = profile.name;
                user.email = profile.email;
                user.image = profile.image;
            }
            return true;
        },
    },
    providers: [
        CredentiasProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'https://i.pinimg.com/originals/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg',
                        isAdmin: user.isAdmin,
                    };
                }
                throw new Error('Invalid email or password')
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    adapter: MongoDBAdapter(clientPromise),

})