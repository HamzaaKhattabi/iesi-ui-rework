import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

function Login() {
    const { data, status } = useSession();
    const router = useRouter();

    console.log('STATUS: ', status)

    const handleSignIn = async (e) => {
        console.log('E : ', e)
        e.preventDefault();

        const status = await signIn('credentials', {
            username: 'admin',
            password: 'admin',
            redirect: true,
            callbackUrl: router.query.callbackUrl
        })

        console.log('STATUS: ', status)
    }

    return(
        <form onSubmit={handleSignIn}>
            <input name="username" type="text" placeholder="Jane Doe" />
            <input name="password" type={"password"} />
            <button type="submit">Login</button>
        </form>
    )
}
export default Login;