import { Container, MantineProvider } from "@mantine/core"
import type { AppProps } from "next/app"
import { WagmiProvider } from "wagmi"
import AppHeader from "../components/AppHeader"
import { Web3ConnectionProvider } from "../components/Web3ConnectionContext"
import { connectors } from "../connectors"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiProvider autoConnect connectors={connectors}>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Web3ConnectionProvider>
        <Container size="sm" py={20}>
          <AppHeader />
          <Component {...pageProps} />
        </Container>
      </Web3ConnectionProvider>
    </MantineProvider>
  </WagmiProvider>
)

export default MyApp
