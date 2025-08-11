import { useState } from 'react'
import { Header } from '@/components/Header'
import { RaffleCard } from '@/components/RaffleCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Calendar, Clock, Trophy } from 'lucide-react'

// Mock raffle data
const mockRaffles = [
  {
    id: '1',
    title: 'Daily ETH Yield Raffle',
    prizeAmount: '2.5',
    prizeToken: 'ETH',
    ticketPrice: '0.01',
    totalTickets: 1000,
    soldTickets: 750,
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    category: 'daily' as const
  },
  {
    id: '2', 
    title: 'Weekly USDC Mega Pool',
    prizeAmount: '5,000',
    prizeToken: 'USDC',
    ticketPrice: '0.05',
    totalTickets: 2000,
    soldTickets: 1200,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    category: 'weekly' as const
  },
  {
    id: '3',
    title: 'Special Airdrop Allocation',
    prizeAmount: '10,000',
    prizeToken: 'HL Points',
    ticketPrice: '0.02',
    totalTickets: 500,
    soldTickets: 320,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    category: 'special' as const
  },
  {
    id: '4',
    title: 'DeFi Strategy Rewards',
    prizeAmount: '1.8',
    prizeToken: 'ETH',
    ticketPrice: '0.008',
    totalTickets: 800,
    soldTickets: 450,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    category: 'daily' as const
  }
]

export default function Raffles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('endTime')

  const filteredRaffles = mockRaffles
    .filter(raffle => 
      raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || raffle.category === categoryFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'endTime':
          return a.endTime.getTime() - b.endTime.getTime()
        case 'prizeAmount':
          return parseFloat(b.prizeAmount.replace(',', '')) - parseFloat(a.prizeAmount.replace(',', ''))
        case 'ticketPrice':
          return parseFloat(a.ticketPrice) - parseFloat(b.ticketPrice)
        default:
          return 0
      }
    })

  const categoryStats = {
    daily: mockRaffles.filter(r => r.category === 'daily').length,
    weekly: mockRaffles.filter(r => r.category === 'weekly').length,
    special: mockRaffles.filter(r => r.category === 'special').length
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Active Raffles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter yield-backed raffles and win from DeFi strategies. Every ticket compounds the prize pool.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-400">{categoryStats.daily}</p>
            <p className="text-sm text-muted-foreground">Daily Raffles</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-400">{categoryStats.weekly}</p>
            <p className="text-sm text-muted-foreground">Weekly Pools</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{categoryStats.special}</p>
            <p className="text-sm text-muted-foreground">Special Events</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search raffles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-card border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="special">Special</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="endTime">Ending Soon</SelectItem>
              <SelectItem value="prizeAmount">Prize Amount</SelectItem>
              <SelectItem value="ticketPrice">Ticket Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge 
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCategoryFilter('all')}
          >
            All ({mockRaffles.length})
          </Badge>
          <Badge 
            variant={categoryFilter === 'daily' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCategoryFilter('daily')}
          >
            Daily ({categoryStats.daily})
          </Badge>
          <Badge 
            variant={categoryFilter === 'weekly' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCategoryFilter('weekly')}
          >
            Weekly ({categoryStats.weekly})
          </Badge>
          <Badge 
            variant={categoryFilter === 'special' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCategoryFilter('special')}
          >
            Special ({categoryStats.special})
          </Badge>
        </div>

        {/* Raffle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaffles.map((raffle) => (
            <RaffleCard key={raffle.id} {...raffle} />
          ))}
        </div>

        {filteredRaffles.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No raffles found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
  )
}