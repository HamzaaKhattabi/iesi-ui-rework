import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from "axios";

export const authOptions = {
    pages: {
        signIn: '/users/login',
    },
    callbacks: {
        jwt: async ({ token, user}) => {
            if (user) {
                token.accessToken = user.access_token
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Jane Doe"},
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                try {
                    const response = await axios.post("http://localhost:8080/api/oauth/token?" + new URLSearchParams({
                        grant_type: 'password',
                        client_id: 'iesi',
                        client_secret: 'iesi',
                        username: 'admin',
                        password: 'admin',
                    }));
                    const user = response.data
                    return user
                } catch (e) {
                    console.error("ERROR : ", e);
                    return null;
                }

            }
        })
    ]
};

export default NextAuth(authOptions)