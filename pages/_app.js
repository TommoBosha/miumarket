import { useRouter } from 'next/router'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'
import { SessionProvider, useSession } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            < Component {...pageProps} />
          </Auth>
        )
          : (< Component {...pageProps} />)}

      </StoreProvider>
    </SessionProvider>)
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <>Loading...</>;
  }
  return children;
}

export default MyApp
