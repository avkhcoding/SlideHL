import { Header } from '@/components/Header'
import { StatsCard } from '@/components/StatsCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { 
  Gift, 
  Star, 
  Zap, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Users,
  Coins,
  Target
} from 'lucide-react'

const mockChallenges = [
  {
    id: '1',
    title: 'First Win Bonus',
    description: 'Win your first raffle and get a 50% ticket refund',
    reward: '0.05 ETH',
    progress: 0,
    target: 1,
    status: 'active',
    category: 'beginner'
  },
  {
    id: '2',
    title: 'High Roller',
    description: 'Buy 100 tickets across all raffles',
    reward: '10 free tickets',
    progress: 67,
    target: 100,
    status: 'active',
    category: 'volume'
  },
  {
    id: '3',
    title: 'Lucky Seven',
    description: 'Win 7 raffles in total',
    reward: 'VIP status + 25% bonus odds',
    progress: 3,
    target: 7,
    status: 'active',
    category: 'achievement'
  },
  {
    id: '4',
    title: 'Community Builder',
    description: 'Refer 5 friends who each buy at least 10 tickets',
    reward: '1 ETH + NFT Badge',
    progress: 2,
    target: 5,
    status: 'active',
    category: 'social'
  }
]

const mockSponsored = [
  {
    id: '1',
    title: 'Hyperliquid Points Giveaway',
    sponsor: 'Hyperliquid',
    description: 'Win 50,000 HL points for ecosystem participation',
    entryRequirement: 'Hold min 0.1 ETH in yield pool',
    prize: '50,000 HL Points',
    endTime: '2024-01-20',
    participants: 2456,
    maxParticipants: 5000
  },
  {
    id: '2',
    title: 'DeFi NFT Whitelist',
    sponsor: 'DeFi Legends',
    description: 'Get early access to exclusive NFT mint',
    entryRequirement: 'Win any raffle this week',
    prize: 'Guaranteed Whitelist Spot',
    endTime: '2024-01-18',
    participants: 342,
    maxParticipants: 500
  }
]

const categoryColors = {
  beginner: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  volume: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  achievement: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  social: 'bg-green-500/20 text-green-400 border-green-500/30'
}

export default function Rewards() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Rewards & Challenges
          </h1>
          <p className="text-lg text-card-foreground/80 max-w-2xl mx-auto">
            Complete challenges, earn rewards, and unlock exclusive benefits in the Slide ecosystem
          </p>
        </div>

        {/* Rewards Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Challenges Completed"
            value="8"
            icon={<Trophy className="w-5 h-5 text-warning" />}
            trend={{ value: '+3 this week', isPositive: true }}
          />
          <StatsCard
            title="Total Rewards Earned"
            value="2.4 ETH"
            icon={<Gift className="w-5 h-5 text-success" />}
            subtitle="~$5,680 USD"
          />
          <StatsCard
            title="Current Streak"
            value="12 days"
            icon={<Zap className="w-5 h-5 text-primary" />}
            subtitle="Daily participation"
          />
          <StatsCard
            title="Rank"
            value="#247"
            icon={<Star className="w-5 h-5 text-warning" />}
            subtitle="Top 5% of users"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6">
              {mockChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border bg-card overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{challenge.title}</h3>
                            <Badge className={`${categoryColors[challenge.category as keyof typeof categoryColors]} border`}>
                              {challenge.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-card-foreground/80">
                            {challenge.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-card-foreground/80 mb-1">Reward</p>
                          <p className="font-bold text-success">{challenge.reward}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-card-foreground/80">Progress</span>
                          <span className="font-medium">
                            {challenge.progress} / {challenge.target}
                          </span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.target) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      {challenge.progress >= challenge.target ? (
                        <Button variant="success" className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Claim Reward
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full border-border">
                          <Target className="w-4 h-4 mr-2" />
                          Continue Challenge
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sponsored" className="space-y-6">
            <div className="grid gap-6">
              {mockSponsored.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <Badge variant="outline" className="border-primary text-primary">
                              Sponsored by {event.sponsor}
                            </Badge>
                          </div>
                          <p className="text-sm text-card-foreground/80">
                            {event.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-card-foreground/80 mb-1">Prize</p>
                          <p className="font-bold text-primary">{event.prize}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium mb-1">Entry Requirement</p>
                        <p className="text-sm text-card-foreground/80">{event.entryRequirement}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-card-foreground/80">Participants</p>
                          <p className="font-semibold">{event.participants.toLocaleString()} / {event.maxParticipants.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-card-foreground/80">Ends</p>
                          <p className="font-semibold">{new Date(event.endTime).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress 
                          value={(event.participants / event.maxParticipants) * 100} 
                          className="h-2"
                        />
                      </div>

                      <Button variant="hero" className="w-full">
                        <Gift className="w-4 h-4 mr-2" />
                        Enter Giveaway
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-warning" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        i < 3 ? 'bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          i === 0 ? 'bg-yellow-500 text-white' :
                          i === 1 ? 'bg-gray-400 text-white' :
                          i === 2 ? 'bg-amber-600 text-white' :
                           'bg-muted text-card-foreground/80'
                         }`}>
                           {i + 1}
                         </div>
                         <div>
                           <p className="font-medium">
                             {i === 0 ? 'You' : `0x${Math.random().toString(16).substr(2, 8)}...`}
                           </p>
                           <p className="text-sm text-card-foreground/80">
                             {Math.floor(Math.random() * 50) + 10} challenges completed
                           </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">
                          {(Math.random() * 5 + 1).toFixed(2)} ETH
                        </p>
                        <p className="text-xs text-card-foreground/70">earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}