import { useAccount } from 'wagmi'
import { Header } from '@/components/Header'
import { StatsCard } from '@/components/StatsCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  Trophy, 
  Ticket, 
  TrendingUp, 
  Clock, 
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react'

// Mock user data
const mockUserData = {
  totalTickets: 24,
  activeRaffles: 3,
  totalWinnings: '1.25',
  winRate: 12.5,
  tickets: [
    {
      id: '1',
      raffleName: 'Daily ETH Yield Raffle',
      ticketCount: 5,
      ticketNumbers: ['#1234', '#1235', '#1236', '#1237', '#1238'],
      endTime: '2024-01-15T18:00:00Z',
      status: 'active',
      prizePool: '2.5 ETH'
    },
    {
      id: '2',
      raffleName: 'Weekly USDC Mega Pool',
      ticketCount: 10,
      ticketNumbers: ['#5671', '#5672', '#5673', '#5674', '#5675', '#5676', '#5677', '#5678', '#5679', '#5680'],
      endTime: '2024-01-17T12:00:00Z',
      status: 'active',
      prizePool: '5,000 USDC'
    }
  ],
  winHistory: [
    {
      id: '1',
      raffleName: 'DeFi Strategy Rewards',
      amount: '0.75 ETH',
      date: '2024-01-10',
      status: 'claimed'
    },
    {
      id: '2',
      raffleName: 'Special Airdrop Allocation',
      amount: '2,500 HL Points',
      date: '2024-01-08',
      status: 'pending'
    }
  ]
}

export default function Dashboard() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Wallet className="w-16 h-16 text-card-foreground/60 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-card-foreground/80 mb-6">
              Connect your wallet to view your dashboard and raffle history.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-card-foreground/80">
            Manage your raffle entries and track your winnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tickets"
            value={mockUserData.totalTickets.toString()}
            icon={<Ticket className="w-5 h-5 text-primary" />}
            trend={{ value: '+15% this week', isPositive: true }}
          />
          <StatsCard
            title="Active Raffles"
            value={mockUserData.activeRaffles.toString()}
            icon={<Trophy className="w-5 h-5 text-success" />}
            subtitle="Entries pending draw"
          />
          <StatsCard
            title="Total Winnings"
            value={`${mockUserData.totalWinnings} ETH`}
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            trend={{ value: '+$2,340 USD', isPositive: true }}
          />
          <StatsCard
            title="Win Rate"
            value={`${mockUserData.winRate}%`}
            icon={<Gift className="w-5 h-5 text-warning" />}
            subtitle="Last 30 days"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="history">Win History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <div className="space-y-4">
              {mockUserData.tickets.map((ticket) => (
                <Card key={ticket.id} className="border-border bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{ticket.raffleName}</CardTitle>
                      <Badge variant="outline" className="text-success border-success">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-card-foreground/80">Prize Pool</span>
                        <span className="font-semibold text-success">{ticket.prizePool}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-card-foreground/80">Your Tickets</span>
                        <span className="font-semibold">{ticket.ticketCount} tickets</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm text-card-foreground/80">Ticket Numbers</span>
                        <div className="flex flex-wrap gap-1">
                          {ticket.ticketNumbers.slice(0, 5).map((num, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {num}
                            </Badge>
                          ))}
                          {ticket.ticketNumbers.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{ticket.ticketNumbers.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center text-sm text-card-foreground/80">
                          <Clock className="w-4 h-4 mr-1" />
                          Ends {new Date(ticket.endTime).toLocaleDateString()}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              {mockUserData.winHistory.map((win) => (
                <Card key={win.id} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{win.raffleName}</h3>
                        <p className="text-sm text-card-foreground/80">
                          Won on {new Date(win.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-success">{win.amount}</p>
                        <Badge 
                          variant={win.status === 'claimed' ? 'default' : 'secondary'}
                          className={win.status === 'claimed' ? 'bg-success text-success-foreground' : ''}
                        >
                          {win.status === 'claimed' ? 'Claimed' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                    {win.status === 'pending' && (
                      <div className="mt-4">
                        <Button variant="success" className="w-full">
                          Claim Reward
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-success" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tickets Won</span>
                      <span>3 / 24 (12.5%)</span>
                    </div>
                    <Progress value={12.5} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Ticket Cost</span>
                      <span>0.025 ETH</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ROI</span>
                      <span className="text-success flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +108%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Won Daily ETH Raffle</p>
                        <p className="text-xs text-card-foreground/70">Jan 10, 2024</p>
                      </div>
                      <span className="text-sm text-success">+0.75 ETH</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Bought 10 tickets</p>
                        <p className="text-xs text-card-foreground/70">Jan 8, 2024</p>
                      </div>
                      <span className="text-sm text-card-foreground/80">-0.25 ETH</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Won Special Airdrop</p>
                        <p className="text-xs text-card-foreground/70">Jan 8, 2024</p>
                      </div>
                      <span className="text-sm text-warning">2.5k Points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}