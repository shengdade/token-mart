import {
  ColorScheme,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { GOERLI_NETWORK_ID } from '../config'
import { persistor, store } from '../state/store'

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Token Mart',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader variant="bars" />} persistor={persistor}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
            }}
          >
            <NotificationsProvider>
              <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                  chains={chains}
                  initialChain={GOERLI_NETWORK_ID}
                  theme={colorScheme === 'light' ? lightTheme() : darkTheme()}
                >
                  <Component {...pageProps} />
                </RainbowKitProvider>
              </WagmiConfig>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </PersistGate>
    </Provider>
  )
}
