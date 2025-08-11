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

export const wagmiConfig = createConfig({
  chains: [hyperliquid],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
    }),
  ],
  transports: {
    [hyperliquid.id]: http(),
  },
})