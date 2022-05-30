import {withAuth} from "../lib/withAuth";
import {requestWrapper} from "../lib/requestWrapper";
import useSWR from 'swr'
import {getSession} from "next-auth/react";

function Scripts({ scriptPage, session }) {
    const { data, error } = useSWR('/scripts', requestWrapper(session))

    console.log('error: ', error)
    if (error) return <p>Failed to load: {error.error_description}</p>
    if (!data) return <p>Loading data ..</p>

    return <p>Script page</p>
}

export const getServerSideProps = withAuth(async context => {
    return {
        props: {
            session: await getSession(context)
        }
    }
})

export default Scripts