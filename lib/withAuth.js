import {getSession} from "next-auth/react";

export function withAuth(gssp) {
    return async (context) => {
        const session = await getSession(context);

        if (!session) {
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
            props: gsspData.props
        }
    }
}