import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gift, TrendingUp, RefreshCw, User, Coins } from 'lucide-react'

interface ExtraSpinsMechanism {
  id: string
  title: string
  description: string
  isActive: boolean
  icon: React.ComponentType<any>
}

interface ExtraSpinsProps {
  mechanisms?: ExtraSpinsMechanism[]
}

export function ExtraSpins({ mechanisms = [] }: ExtraSpinsProps) {
  const defaultMechanisms: ExtraSpinsMechanism[] = [
    {
      id: 'nft',
      title: 'Slide NFT',
      description: 'Own a Slide NFT',
      isActive: false,
      icon: Gift
    },
    {
      id: 'stake',
      title: 'Stake $100+',
      description: 'In Hyperlend, Hypurrfi, or Felix',
      isActive: true,
      icon: TrendingUp
    },
    {
      id: 'swap',
      title: 'Swap on Gliquid',
      description: 'Complete swaps to earn spins',
      isActive: false,
      icon: RefreshCw
    },
    {
      id: 'domain',
      title: '.hl or .hype Name',
      description: 'Own a Hyperliquid domain',
      isActive: false,
      icon: User
    },
    {
      id: 'streak',
      title: 'Daily Streak',
      description: 'Consecutive daily plays',
      isActive: false,
      icon: Coins
    }
  ]

  const displayMechanisms = mechanisms.length > 0 ? mechanisms : defaultMechanisms

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-card-foreground">
          <Gift className="w-5 h-5 mr-2 text-accent" />
          Extra Spins
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayMechanisms.map((mechanism) => (
          <div
            key={mechanism.id}
            className={`p-3 rounded-lg border transition-colors ${
              mechanism.isActive
                ? 'bg-primary/10 border-primary/30'
                : 'bg-muted/20 border-muted/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <mechanism.icon 
                  className={`w-4 h-4 ${
                    mechanism.isActive ? 'text-primary' : 'text-card-foreground/60'
                  }`} 
                />
                <div>
                  <div className={`font-medium text-sm ${
                    mechanism.isActive ? 'text-card-foreground' : 'text-card-foreground/80'
                  }`}>
                    {mechanism.title}
                  </div>
                  <div className={`text-xs ${
                    mechanism.isActive ? 'text-card-foreground/80' : 'text-card-foreground/60'
                  }`}>
                    {mechanism.description}
                  </div>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={
                  mechanism.isActive 
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-card-foreground/60 border-muted'
                }
              >
                {mechanism.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}