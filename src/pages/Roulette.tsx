import { useState } from 'react'
import { Header } from '@/components/Header'
import { RouletteWheel, RouletteSegment } from '@/components/RouletteWheel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, TrendingUp, Users, Clock, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data for demonstration
const mockGameData = {
  dailyPool: 100, // $100 daily pool
  totalSpinsToday: 1247,
  uniquePlayersToday: 89,
  biggestWinToday: 60, // 60% of pool
  timeUntilReset: '14:32:18',
  userBalance: 2.5, // $HYPE balance
  userSpinsToday: 8,
  maxSpinsPerDay: 50,
  spinPrice: 0.025 // 0.025 $HYPE per spin
}

export default function Roulette() {
  const [gameData, setGameData] = useState(mockGameData)
  const [recentWins, setRecentWins] = useState<Array<{
    id: string
    player: string
    prize: string
    timestamp: Date
  }>>([
    { id: '1', player: '0x1234...5678', prize: 'Cash 25%', timestamp: new Date(Date.now() - 5000) },
    { id: '2', player: '0x9abc...def0', prize: 'Points 2x', timestamp: new Date(Date.now() - 15000) },
    { id: '3', player: '0x2468...ace0', prize: 'Bonus Spin', timestamp: new Date(Date.now() - 30000) },
    { id: '4', player: '0x1357...bdf9', prize: 'Mystery Prize', timestamp: new Date(Date.now() - 45000) },
  ])

  const handleSpin = (result: RouletteSegment) => {
    // Update game data
    setGameData(prev => ({
      ...prev,
      userSpinsToday: prev.userSpinsToday + 1,
      totalSpinsToday: prev.totalSpinsToday + 1
    }))

    // Add to recent wins if it's a win
    if (result.type !== 'none') {
      const newWin = {
        id: Date.now().toString(),
        player: '0x' + Math.random().toString(16).substr(2, 4) + '...' + Math.random().toString(16).substr(2, 4),
        prize: result.label,
        timestamp: new Date()
      }
      setRecentWins(prev => [newWin, ...prev.slice(0, 9)]) // Keep last 10 wins
    }
  }

  const progressToReset = ((24 * 60 * 60 * 1000) - (new Date().getTime() % (24 * 60 * 60 * 1000))) / (24 * 60 * 60 * 1000) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
          >
            Slide Roulette
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Spin the yield-backed roulette for instant rewards, multipliers, and mystery prizes
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-4 text-center">
              <Coins className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">${gameData.dailyPool}</p>
              <p className="text-sm text-muted-foreground">Daily Pool</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-success/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">{gameData.totalSpinsToday}</p>
              <p className="text-sm text-muted-foreground">Spins Today</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-accent/20">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{gameData.uniquePlayersToday}</p>
              <p className="text-sm text-muted-foreground">Players</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-warning/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-warning">${gameData.biggestWinToday}</p>
              <p className="text-sm text-muted-foreground">Biggest Win</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Roulette Wheel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2"
          >
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
              <CardContent className="p-8">
                <RouletteWheel
                  dailyPool={gameData.dailyPool}
                  userSpinsToday={gameData.userSpinsToday}
                  maxSpinsPerDay={gameData.maxSpinsPerDay}
                  spinPrice={gameData.spinPrice}
                  onSpin={handleSpin}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* User Stats */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="font-semibold">{gameData.userBalance} $HYPE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Spins Today</span>
                  <span className="font-semibold">{gameData.userSpinsToday}/{gameData.maxSpinsPerDay}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Daily Reset</span>
                    <span className="font-semibold text-primary">{gameData.timeUntilReset}</span>
                  </div>
                  <Progress value={progressToReset} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Live Activity */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-success" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentWins.slice(0, 6).map((win, index) => (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">{win.player}</p>
                      <p className="text-muted-foreground">
                        {Math.floor((Date.now() - win.timestamp.getTime()) / 1000)}s ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {win.prize}
                    </Badge>
                  </motion.div>
                ))}
                {recentWins.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm">
                    No recent activity
                  </p>
                )}
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p>Pay 0.025 $HYPE to spin the roulette</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p>Win instant payouts from the daily pool or point multipliers</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p>Mystery prizes include NFTs and partner tokens</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p>Maximum 50 spins per day with 5s cooldown</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}