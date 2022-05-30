import { withAuth } from "../lib/withAuth";

function Scripts() {
    return (
        <p>Scripts page</p>
    )
}

export const getServerSideProps = withAuth(context => {
    return { props: { }}
})

export default Scripts