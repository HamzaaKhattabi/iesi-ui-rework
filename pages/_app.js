import '../styles/globals.css'
import {getSession, SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps }) {

  return <SessionProvider>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
