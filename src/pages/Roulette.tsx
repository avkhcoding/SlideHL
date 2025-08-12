import { useState } from 'react'
import { Header } from '@/components/Header'
import { CashRouletteWheel, CashRouletteSegment } from '@/components/CashRouletteWheel'
import { YieldRouletteWheel, YieldRouletteSegment } from '@/components/YieldRouletteWheel'
import { StreakTracker } from '@/components/StreakTracker'
import { Leaderboard } from '@/components/Leaderboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Coins, TrendingUp, Users, Clock, Trophy, Zap, Gift, Star, Shield, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data for demonstration
const mockGameData = {
  cashPool: 2000, // $2000 daily cash pool
  weeklyYield: 1400, // $1400 weekly yield
  totalSpinsToday: 1247,
  uniquePlayersToday: 89,
  biggestWinToday: 1200, // 60% of cash pool
  timeUntilReset: '14:32:18',
  userBalance: 2.5, // $HYPE balance
  userCashSpinsToday: 3,
  userYieldSpinsToday: 5,
  userPoints: 12450,
  userStreak: 7,
  longestStreak: 14,
  bonusSpins: 2,
  maxSpinsPerDay: 20
}

const mockLeaderboard = [
  { rank: 1, address: '0x1234...5678', points: 45000, streak: 30 },
  { rank: 2, address: '0x9abc...def0', points: 38500, streak: 15 },
  { rank: 3, address: '0x2468...ace0', points: 32100, streak: 8 },
  { rank: 4, address: '0x1357...bdf9', points: 28900, streak: 12 },
  { rank: 5, address: '0x5555...aaaa', points: 25600, streak: 5 },
]

const extraSpinMechanisms = [
  { name: 'Slide NFT', description: 'Own a Slide NFT', active: false, icon: Gift },
  { name: 'Stake $100+', description: 'In Hyperlend, Hypurrfi, or Felix', active: true, icon: TrendingUp },
  { name: 'Gliquid Swap', description: 'Swap on Gliquid DEX', active: false, icon: Zap },
  { name: '.hl/.hype Name', description: 'Own Hyperliquid domain', active: false, icon: Star },
]

export default function Roulette() {
  const [gameData, setGameData] = useState(mockGameData)
  const [recentWins, setRecentWins] = useState<Array<{
    id: string
    player: string
    prize: string
    timestamp: Date
    type: 'cash' | 'yield'
  }>>([
    { id: '1', player: '0x1234...5678', prize: 'Cash 25%', timestamp: new Date(Date.now() - 5000), type: 'cash' },
    { id: '2', player: '0x9abc...def0', prize: 'Points 2x', timestamp: new Date(Date.now() - 15000), type: 'yield' },
    { id: '3', player: '0x2468...ace0', prize: 'Yield Claim', timestamp: new Date(Date.now() - 30000), type: 'yield' },
    { id: '4', player: '0x1357...bdf9', prize: 'Mystery Prize', timestamp: new Date(Date.now() - 45000), type: 'cash' },
  ])

  const handleCashSpin = (result: CashRouletteSegment) => {
    setGameData(prev => ({
      ...prev,
      userCashSpinsToday: prev.userCashSpinsToday + 1,
      totalSpinsToday: prev.totalSpinsToday + 1
    }))

    if (result.type !== 'none') {
      const newWin = {
        id: Date.now().toString(),
        player: '0x' + Math.random().toString(16).substr(2, 4) + '...' + Math.random().toString(16).substr(2, 4),
        prize: result.label,
        timestamp: new Date(),
        type: 'cash' as const
      }
      setRecentWins(prev => [newWin, ...prev.slice(0, 9)])
    }
  }

  const handleYieldSpin = (result: YieldRouletteSegment) => {
    setGameData(prev => ({
      ...prev,
      userYieldSpinsToday: prev.userYieldSpinsToday + 1,
      totalSpinsToday: prev.totalSpinsToday + 1
    }))

    if (result.type !== 'none') {
      const newWin = {
        id: Date.now().toString(),
        player: '0x' + Math.random().toString(16).substr(2, 4) + '...' + Math.random().toString(16).substr(2, 4),
        prize: result.label,
        timestamp: new Date(),
        type: 'yield' as const
      }
      setRecentWins(prev => [newWin, ...prev.slice(0, 9)])
    }
  }

  const progressToReset = ((24 * 60 * 60 * 1000) - (new Date().getTime() % (24 * 60 * 60 * 1000))) / (24 * 60 * 60 * 1000) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header userPoints={gameData.userPoints} userBalance={gameData.userBalance} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
          >
            Slide Roulette
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Spin for instant cash rewards or daily yield claims with extra spin bonuses
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardContent className="p-3 md:p-4 text-center">
              <Coins className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-2" />
              <p className="text-lg md:text-2xl font-bold text-primary">${gameData.cashPool.toLocaleString()}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Cash Pool</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 border-warning/20">
            <CardContent className="p-3 md:p-4 text-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-warning mx-auto mb-2" />
              <p className="text-lg md:text-2xl font-bold text-warning">${(gameData.weeklyYield / 7).toFixed(0)}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Daily Yield</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20">
            <CardContent className="p-3 md:p-4 text-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-accent mx-auto mb-2" />
              <p className="text-lg md:text-2xl font-bold text-accent">{gameData.uniquePlayersToday}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Players</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/50 border-destructive/20">
            <CardContent className="p-3 md:p-4 text-center">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-destructive mx-auto mb-2" />
              <p className="text-lg md:text-2xl font-bold text-destructive">${gameData.biggestWinToday.toLocaleString()}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Biggest Win</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roulette Games */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Cash Roulette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CashRouletteWheel
              dailyPool={gameData.cashPool}
              userSpinsToday={gameData.userCashSpinsToday}
              maxSpinsPerDay={gameData.maxSpinsPerDay}
              spinPrice={0.04}
              onSpin={handleCashSpin}
            />
          </motion.div>

          {/* Yield Roulette */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <YieldRouletteWheel
              weeklyYield={gameData.weeklyYield}
              userSpinsToday={gameData.userYieldSpinsToday}
              maxSpinsPerDay={gameData.maxSpinsPerDay}
              spinPrice={0.025}
              onSpin={handleYieldSpin}
            />
          </motion.div>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Streak Tracker */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StreakTracker
              currentStreak={gameData.userStreak}
              longestStreak={gameData.longestStreak}
              bonusSpins={gameData.bonusSpins}
            />
          </motion.div>

          {/* Extra Spins */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-card to-card/50 border-success/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-card-foreground">
                  <Shield className="w-5 h-5 mr-2 text-success" />
                  Extra Spins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {extraSpinMechanisms.map((mechanism, index) => {
                  const Icon = mechanism.icon
                  return (
                    <div
                      key={mechanism.name}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        mechanism.active
                          ? 'bg-success/10 border-success/20'
                          : 'bg-muted/30 border-muted/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${mechanism.active ? 'text-success' : 'text-muted-foreground'}`} />
                        <div>
                          <p className={`text-sm font-medium ${mechanism.active ? 'text-success' : 'text-muted-foreground'}`}>
                            {mechanism.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{mechanism.description}</p>
                        </div>
                      </div>
                      <Badge variant={mechanism.active ? "default" : "outline"} className="text-xs">
                        {mechanism.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-card to-card/50 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-card-foreground">
                  <Clock className="w-5 h-5 mr-2 text-success" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentWins.slice(0, 5).map((win, index) => (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${win.type === 'cash' ? 'bg-destructive' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium text-card-foreground">{win.player}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor((Date.now() - win.timestamp.getTime()) / 1000)}s ago
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {win.prize}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Leaderboard
            leaders={mockLeaderboard}
            userRank={15}
            userPoints={gameData.userPoints}
          />
        </motion.div>
      </main>
    </div>
  )
}