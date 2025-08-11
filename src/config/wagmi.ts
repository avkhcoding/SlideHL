import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { defineChain } from 'viem'

// Hyperliquid EVM Chain Definition
export const hyperliquid = defineChain({
  id: 998,
  name: 'Hyperliquid Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hyperliquid-testnet.xyz/evm'],
    },
  },
  blockExplorers: {
    default: { name: 'HyperScan', url: 'https://explorer.hyperliquid-testnet.xyz' },
  },
})

const WALLETCONNECT_PROJECT_ID =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_WALLETCONNECT_PROJECT_ID) ||
  (typeof window !== 'undefined' ? window.localStorage?.getItem('WALLETCONNECT_PROJECT_ID') : null) ||
  'demo'

export const wagmiConfig = createConfig({
  chains: [hyperliquid],
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
    }),
  ],
  transports: {
    [hyperliquid.id]: http(),
  },
})