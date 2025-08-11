import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Timer, Users, Ticket, Trophy, Coins } from 'lucide-react'
import { motion } from 'framer-motion'

interface RaffleCardProps {
  id: string
  title: string
  prizeAmount: string
  prizeToken: string
  ticketPrice: string
  totalTickets: number
  soldTickets: number
  endTime: Date
  category: 'daily' | 'weekly' | 'special'
  image?: string
}

export function RaffleCard({
  id,
  title,
  prizeAmount,
  prizeToken,
  ticketPrice,
  totalTickets,
  soldTickets,
  endTime,
  category
}: RaffleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const timeLeft = endTime.getTime() - Date.now()
  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  
  const progress = (soldTickets / totalTickets) * 100
  
  const categoryColors = {
    daily: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    weekly: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    special: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="card-hover border-border bg-gradient-to-br from-card to-card/50 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${categoryColors[category]} border`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Timer className="w-4 h-4 mr-1" />
              {hours}h {minutes}m
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Prize Display */}
          <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-success-foreground">Prize Pool</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-success">{prizeAmount}</p>
              <p className="text-xs text-success/80">{prizeToken}</p>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ticket Price</span>
              <span className="font-medium text-foreground flex items-center">
                <Coins className="w-4 h-4 mr-1 text-primary" />
                {ticketPrice} ETH
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  Tickets Sold
                </span>
                <span className="font-medium text-foreground">
                  {soldTickets.toLocaleString()} / {totalTickets.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-muted"
              />
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="hero"
              className="w-full py-3"
              disabled={timeLeft <= 0}
            >
              <Ticket className="w-4 h-4 mr-2" />
              {timeLeft <= 0 ? 'Draw Complete' : 'Buy Tickets'}
            </Button>
          </motion.div>

          {/* Odds Display */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Your odds: 1 in {Math.ceil(totalTickets / Math.max(1, soldTickets))}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}