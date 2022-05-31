import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";


export function withAuth(gssp) {
    return async (context) => {
        const session = await getServerSession(context, authOptions);

        if (!session || session?.error === "RefreshAccessTokenError") {
            return {
                redirect: {
                    permanent: false,
                    destination: `/users/login?${new URLSearchParams({
                        callbackUrl: context.resolvedUrl
                    })}`
                }
            }
        }

        const gsspData = await gssp(context);

        return {
            props: {
                ...gsspData.props,
            }
        }
    }
}