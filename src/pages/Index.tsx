import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Users, Trophy, ChevronRight, RotateCcw, Coins, Gift, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

// Recent winners data for homepage
const recentWinners = [
  {
    id: '1',
    player: '0x1234...5678',
    prize: 'Cash 40%',
    amount: '$40',
    time: '2 min ago',
    color: 'hsl(var(--warning))'
  },
  {
    id: '2', 
    player: '0x9abc...def0',
    prize: 'Points 2x',
    amount: '2x Multiplier',
    time: '5 min ago',
    color: 'hsl(var(--accent))'
  },
  {
    id: '3',
    player: '0x2468...ace0', 
    prize: 'Mystery Prize',
    amount: 'NFT Whitelist',
    time: '8 min ago',
    color: 'hsl(242 99% 71%)'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Verifiable & Fair',
    description: 'Chainlink VRF ensures provably fair spins with on-chain verification'
  },
  {
    icon: Zap,
    title: 'Yield-Backed Prizes',
    description: 'Daily prize pools funded by DeFi strategies on Hyperliquid'
  },
  {
    icon: RotateCcw,
    title: 'Instant Spins',
    description: 'Spin the wheel anytime with just 0.025 $HYPE - no waiting for draws'
  },
  {
    icon: Gift,
    title: 'Multiple Prize Types',
    description: 'Win cash payouts, point multipliers, free spins, or mystery prizes'
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Recent Winners */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Recent Winners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join players winning prizes every few minutes on the roulette
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {recentWinners.map((winner, index) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover border-border bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6" style={{ color: winner.color }} />
                    </div>
                    <p className="font-semibold text-lg mb-2" style={{ color: winner.color }}>
                      {winner.prize}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {winner.player}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {winner.time}
                    </p>
                    <Badge variant="outline" className="mt-3">
                      {winner.amount}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="hero" className="px-8 py-4">
              <Link to="/roulette">
                Try Your Luck
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">Slide</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A revolutionary approach to DeFi that combines yield farming with gamified raffles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-hover border-border bg-gradient-to-br from-card to-card/50 text-center h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-success/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Winning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users earning yield through gamified DeFi. Connect your wallet and start participating today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" className="px-8 py-4 text-lg">
                <Link to="/roulette">
                  Spin the Wheel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-border hover:bg-accent px-8 py-4 text-lg">
                <Link to="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  Slide
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Yield-backed roulette on Hyperliquid EVM. Built for the future of DeFi.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/roulette" className="block hover:text-foreground transition-colors">Roulette</Link>
                <Link to="/dashboard" className="block hover:text-foreground transition-colors">Dashboard</Link>
                <Link to="/rewards" className="block hover:text-foreground transition-colors">Rewards</Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground transition-colors">Documentation</a>
                <a href="#" className="block hover:text-foreground transition-colors">FAQ</a>
                <a href="#" className="block hover:text-foreground transition-colors">Support</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground transition-colors">Discord</a>
                <a href="#" className="block hover:text-foreground transition-colors">Twitter</a>
                <a href="#" className="block hover:text-foreground transition-colors">Telegram</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Slide. All rights reserved. Built on Hyperliquid EVM.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
