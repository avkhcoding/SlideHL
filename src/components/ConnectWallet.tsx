import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Wallet, ExternalLink, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const handleConnect = (connector: any) => {
    connect({ connector })
    setIsModalOpen(false)
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet"
    })
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet"
    })
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard"
      })
    }
  }

  const formatAddress = (addr: string) => 
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
          <span className="text-sm font-medium">{formatAddress(address)}</span>
          <button
            onClick={copyAddress}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="text-foreground border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="hero"
        className="px-6 py-3"
        disabled={isPending}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Connect Your Wallet
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                variant="outline"
                className="w-full justify-between p-4 h-auto border-border hover:bg-accent transition-colors"
                disabled={isPending}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{connector.name}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Button>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            By connecting your wallet, you agree to our Terms of Service
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}