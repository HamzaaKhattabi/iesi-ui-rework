import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from "axios";


async function refreshAccessToken(token) {
    try {
        const response = await axios.post('http://localhost:8080/api/oauth/token?' + new URLSearchParams({
            'grant_type': 'refresh_token',
            'client_id': 'iesi',
            'client_secret': 'iesi',
            'refresh_token': token.refreshToken
        }))

        console.log('new expire at: ', new Date(Date.now() + response.data.expires_in * 1000))
        return {
            ...token,
            accessToken: response.data.access_token,
            accessTokenExpireAt: new Date(Date.now() + response.data.expires_in * 1000),
            refreshToken: response.data.refresh_token ?? token.refreshToken,
        }
    } catch (e) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}


export const authOptions = {
    pages: {
        signIn: '/users/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user, account}) => {
            if (account && user) {
                return {
                    accessToken: user.access_token,
                    accessTokenExpireAt: new Date(Date.now() + user.expires_in * 1000),
                    refreshToken: user.refresh_token,
                }
            }

            if (new Date(Date.now()) >= new Date(token.accessTokenExpireAt)) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken
            session.user = null;
            session.error = token.error ?? null;
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