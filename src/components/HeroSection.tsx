import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { StatsCard } from './StatsCard'
import { ConnectWallet } from './ConnectWallet'
import { useAccount } from 'wagmi'
import { TrendingUp, Users, Clock, Trophy, ArrowRight, Sparkles } from 'lucide-react'

const mockStats = {
  totalValueLocked: '$2.4M',
  currentAPR: '18.5%',
  activeUsers: '12.3k',
  nextDraw: '4h 23m'
}

export function HeroSection() {
  const { isConnected } = useAccount()

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-success/10 animate-gradient"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float opacity-60"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gamified Yield on Hyperliquid
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent">
                  Win Big
                </span>
                <br />
                with DeFi Yield
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Enter yield-backed raffles powered by advanced DeFi strategies. Every ticket compounds the prize pool, creating sustainable rewards for all participants.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {!isConnected ? (
                <ConnectWallet />
              ) : (
                <Button variant="hero" className="px-8 py-4 text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Enter Raffles Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              <Button variant="outline" className="border-border hover:bg-accent px-8 py-4 text-lg">
                Learn How It Works
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow"></div>
                Verified on-chain
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-glow"></div>
                Hyperliquid EVM
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-2 animate-pulse-glow"></div>
                Chainlink VRF
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <StatsCard
                title="Total Value Locked"
                value={mockStats.totalValueLocked}
                icon={<TrendingUp className="w-5 h-5 text-success" />}
                trend={{ value: '+12.4% this week', isPositive: true }}
                className="animate-fade-in"
              />
              <StatsCard
                title="Current APR"
                value={mockStats.currentAPR}
                icon={<Clock className="w-5 h-5 text-primary" />}
                subtitle="Yield from strategies"
                className="animate-fade-in"
              />
              <StatsCard
                title="Active Players"
                value={mockStats.activeUsers}
                icon={<Users className="w-5 h-5 text-warning" />}
                trend={{ value: '+850 this month', isPositive: true }}
                className="animate-fade-in"
              />
              <StatsCard
                title="Next Draw"
                value={mockStats.nextDraw}
                icon={<Trophy className="w-5 h-5 text-success" />}
                subtitle="Daily ETH Raffle"
                className="animate-fade-in"
              />
            </div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <h3 className="font-semibold text-foreground flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow"></div>
                Live Activity
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">🎫 0x7d2f...3a1c bought 5 tickets</span>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">🏆 0x9b4e...7f2d won 1.2 ETH</span>
                  <span className="text-xs text-muted-foreground">5m ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">💰 Pool grew by $15k</span>
                  <span className="text-xs text-muted-foreground">8m ago</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}