// pages/_app.tsx
import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import Layout from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from "next/router";
import React from 'react'

function MyApp({ Component, pageProps }) {

  const [isFirstMount, setIsFirstMount] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <AnimatePresence exitBeforeEnter>
          <Component isFirstMount={isFirstMount}
          key={router.route} {...pageProps} />
          </AnimatePresence>
        </Layout>
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp