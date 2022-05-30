import axios from 'axios'
import {getSession} from "next-auth/react";

export function requestWrapper(session) {
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api',
        timeout: 1000
    })

    instance.interceptors.request.use(async (request) => {

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