import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import { getCont} from 'next';

function Login() {
    const router = useRouter();
    const handleSignIn = async (e) => {
        e.preventDefault();

        await signIn('credentials', {
            username: 'admin',
            password: 'admin',
            redirect: true,
            callbackUrl: router.query.callbackUrl
        })
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