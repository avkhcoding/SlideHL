import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface LeaderboardEntry {
  rank: number
  address: string
  points: number
  streak: number
  avatar?: string
}

interface LeaderboardProps {
  leaders: LeaderboardEntry[]
  userRank?: number
  userPoints?: number
}

export function Leaderboard({ leaders, userRank, userPoints }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-warning" />
      case 2:
        return <Medal className="w-5 h-5 text-muted-foreground" />
      case 3:
        return <Award className="w-5 h-5 text-destructive" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "outline"
    if (rank <= 3) return "secondary"
    if (rank <= 10) return "outline"
    return "outline"
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-success/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-card-foreground">
          <TrendingUp className="w-5 h-5 mr-2 text-success" />
          Points Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* User's position */}
        {userRank && userPoints && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-primary/10 border border-primary/20 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                  {getRankIcon(userRank)}
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Your Position</p>
                  <p className="text-sm text-muted-foreground">#{userRank}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary text-primary-foreground">
                {userPoints.toLocaleString()} pts
              </Badge>
            </div>
          </motion.div>
        )}

        {/* Top leaders */}
        <div className="space-y-2">
          {leaders.slice(0, 10).map((leader, index) => (
            <motion.div
              key={leader.address}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                leader.rank <= 3
                  ? 'bg-gradient-to-r from-warning/5 to-success/5 border-warning/20'
                  : 'bg-muted/30 border-muted/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(leader.rank)}
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {leader.address.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-card-foreground text-sm">
                    {leader.address.slice(0, 6)}...{leader.address.slice(-4)}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{leader.points.toLocaleString()} pts</span>
                    {leader.streak > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-destructive">{leader.streak}🔥</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Badge variant={getRankBadge(leader.rank)} className="text-xs">
                #{leader.rank}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* View more */}
        {leaders.length > 10 && (
          <div className="text-center pt-2">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View full leaderboard
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}