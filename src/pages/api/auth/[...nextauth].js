import nextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";

export const options = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  pages: {
    newUser: "/newuser", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: MongoDBAdapter(clientPromise),
};

export default (req, res) => nextAuth(req, res, options);
