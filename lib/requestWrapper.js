import axios from 'axios'
import {getSession} from "next-auth/react";

export function requestWrapper() {
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api',
        timeout: 1000
    })

    instance.interceptors.request.use(async (request) => {
        const session = await getSession();
        if (session) {
            request.headers.common = {
                Authorization: `Bearer ${session.accessToken}`
            }
        }

        return request;
    })

    instance.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        throw error.response.data
    })

    return instance;
}