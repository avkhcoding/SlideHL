import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Flame, Trophy, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

interface StreakTrackerProps {
  currentStreak: number
  longestStreak: number
  bonusSpins: number
}

export function StreakTracker({ currentStreak, longestStreak, bonusSpins }: StreakTrackerProps) {
  const streakMilestones = [3, 7, 14, 30]
  const nextMilestone = streakMilestones.find(m => m > currentStreak) || streakMilestones[streakMilestones.length - 1]
  const progress = (currentStreak / nextMilestone) * 100

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return <Trophy className="w-5 h-5 text-warning" />
    if (streak >= 14) return <Gift className="w-5 h-5 text-destructive" />
    if (streak >= 7) return <Flame className="w-5 h-5 text-primary" />
    if (streak >= 3) return <Flame className="w-5 h-5 text-success" />
    return <Flame className="w-5 h-5 text-muted-foreground" />
  }

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return "Legendary"
    if (streak >= 14) return "Master"
    if (streak >= 7) return "Expert"
    if (streak >= 3) return "Pro"
    return "Novice"
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-card-foreground">
          {getStreakIcon(currentStreak)}
          <span className="ml-2">Daily Streak</span>
          <Badge variant="outline" className="ml-auto bg-background text-foreground">
            {getStreakLevel(currentStreak)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <div className="text-center">
          <motion.div
            key={currentStreak}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-3xl font-bold text-card-foreground mb-2"
          >
            {currentStreak} days
          </motion.div>
          <p className="text-sm text-muted-foreground">Current streak</p>
        </div>

        {/* Progress to next milestone */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Next milestone: {nextMilestone} days</span>
            <span>{Math.max(0, nextMilestone - currentStreak)} to go</span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-3" />
        </div>

        {/* Milestone rewards */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-card-foreground">Milestone Rewards</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {streakMilestones.map((milestone, index) => (
              <div
                key={milestone}
                className={`p-2 rounded-lg border ${
                  currentStreak >= milestone
                    ? 'bg-primary/10 border-primary/30 text-card-foreground'
                    : 'bg-muted/30 border-muted/40 text-card-foreground'
                }`}
              >
                <div className="font-semibold">{milestone} days</div>
                <div>{index + 1} bonus spin{index + 1 > 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="pt-2 border-t border-border space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Longest streak</span>
            <span className="font-semibold text-card-foreground">{longestStreak} days</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Bonus spins available</span>
            <Badge variant="outline" className="bg-success text-success-foreground">
              {bonusSpins}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}