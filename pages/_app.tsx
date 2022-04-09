import { Container, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import type { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { WagmiProvider } from "wagmi"
import AppFooter from "../components/AppFooter"
import AppHeader from "../components/AppHeader"
import { Web3ConnectionProvider } from "../components/Web3ConnectionContext"
import { connectors } from "../connectors"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Guild Members Exporter</title>
    </Head>
    <WagmiProvider autoConnect connectors={connectors}>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider>
          <Web3ConnectionProvider>
            <QueryClientProvider client={queryClient}>
              <Container size="sm" py={20}>
                <AppHeader />
                <Component {...pageProps} />
                <AppFooter />
              </Container>
            </QueryClientProvider>
          </Web3ConnectionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </WagmiProvider>
  </>
)

export default MyApp
