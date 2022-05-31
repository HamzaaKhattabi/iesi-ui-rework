import {withAuth} from "../lib/withAuth";
import useSWR from 'swr'
import {requestWrapper} from "../lib/requestWrapper";

function Scripts() {
    const { data, error } = useSWR('http://localhost:8080/api/scripts', requestWrapper())

    if (error) {
        return <p>{error.error_description}</p>
    }

    return <p>Script page</p>
}

export const getServerSideProps = withAuth(context => {
    return {
        props: {

        }
    }
})


export default Scripts