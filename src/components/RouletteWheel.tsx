import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, RotateCcw, Sparkles, Gift, Repeat } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export interface RouletteSegment {
  id: string
  label: string
  type: 'none' | 'points_multiplier' | 'instant_payout' | 'mixed' | 'airdrop_allocation' | 'free_spin' | 'jackpot_entry'
  amount: number | string
  probability: number
  color: string
  icon: React.ComponentType<any>
}

const segments: RouletteSegment[] = [
  { id: '1', label: 'Try Again', type: 'none', amount: 0, probability: 30, color: 'hsl(var(--muted))', icon: Repeat },
  { id: '2', label: 'Points 1.2x', type: 'points_multiplier', amount: 1.2, probability: 20, color: 'hsl(var(--primary))', icon: Sparkles },
  { id: '3', label: 'Points 2x', type: 'points_multiplier', amount: 2, probability: 10, color: 'hsl(var(--accent))', icon: Sparkles },
  { id: '4', label: 'Cash 15%', type: 'instant_payout', amount: '15% Pool', probability: 8, color: 'hsl(var(--success))', icon: Coins },
  { id: '5', label: 'Cash 25%', type: 'instant_payout', amount: '25% Pool', probability: 5, color: 'hsl(var(--success-glow))', icon: Coins },
  { id: '6', label: 'Cash 40%', type: 'instant_payout', amount: '40% Pool', probability: 3, color: 'hsl(var(--warning))', icon: Coins },
  { id: '7', label: 'Cash 60% + 5x Points', type: 'mixed', amount: '60% Pool + 5x', probability: 1, color: 'hsl(var(--destructive))', icon: Coins },
  { id: '8', label: 'Mystery Prize', type: 'airdrop_allocation', amount: 'Partner Reward', probability: 8, color: 'hsl(242 99% 71%)', icon: Gift },
  { id: '9', label: 'Bonus Spin', type: 'free_spin', amount: 1, probability: 10, color: 'hsl(var(--primary-glow))', icon: RotateCcw },
  { id: '10', label: 'Jackpot Key', type: 'jackpot_entry', amount: 1, probability: 5, color: 'hsl(39 100% 69%)', icon: Sparkles }
]

interface RouletteWheelProps {
  dailyPool: number
  userSpinsToday: number
  maxSpinsPerDay: number
  spinPrice: number
  onSpin: (result: RouletteSegment) => void
  disabled?: boolean
}

export function RouletteWheel({ 
  dailyPool, 
  userSpinsToday, 
  maxSpinsPerDay, 
  spinPrice, 
  onSpin, 
  disabled = false 
}: RouletteWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<RouletteSegment | null>(null)
  const [cooldownActive, setCooldownActive] = useState(false)
  const controls = useAnimation()
  const { toast } = useToast()
  
  const canSpin = !disabled && !isSpinning && !cooldownActive && userSpinsToday < maxSpinsPerDay

  const getRandomSegment = (): RouletteSegment => {
    const totalWeight = segments.reduce((sum, segment) => sum + segment.probability, 0)
    let random = Math.random() * totalWeight
    
    for (const segment of segments) {
      random -= segment.probability
      if (random <= 0) {
        return segment
      }
    }
    return segments[0] // fallback
  }

  const handleSpin = async () => {
    if (!canSpin) return

    setIsSpinning(true)
    const result = getRandomSegment()
    
    // Calculate rotation angle based on segment position
    const segmentIndex = segments.findIndex(s => s.id === result.id)
    const segmentAngle = 360 / segments.length
    const targetAngle = segmentIndex * segmentAngle
    const fullRotations = 360 * 3 // 3 full rotations
    const finalAngle = fullRotations + (360 - targetAngle) // Invert to land on correct segment
    
    try {
      await controls.start({
        rotate: finalAngle,
        transition: { 
          duration: 3,
          ease: [0.17, 0.67, 0.12, 0.99]
        }
      })
      
      setLastResult(result)
      onSpin(result)
      
      // Show win notification
      if (result.type !== 'none') {
        toast({
          title: "🎉 Congratulations!",
          description: `You won: ${result.label}`,
          duration: 5000,
        })
      }
      
    } catch (error) {
      console.error('Spin animation failed:', error)
    } finally {
      setIsSpinning(false)
      
      // Start cooldown
      setCooldownActive(true)
      setTimeout(() => setCooldownActive(false), 5000)
    }
  }

  const segmentAngle = 360 / segments.length
  const radius = 150

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary drop-shadow-lg" />
        </div>
        
        {/* Wheel */}
        <div className="relative">
          <motion.div
            animate={controls}
            className="relative"
            style={{ width: radius * 2, height: radius * 2 }}
          >
            <svg 
              width={radius * 2} 
              height={radius * 2} 
              className="drop-shadow-2xl"
            >
              {/* Outer ring */}
              <circle
                cx={radius}
                cy={radius}
                r={radius - 2}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                className="drop-shadow-lg"
              />
              
              {/* Segments */}
              {segments.map((segment, index) => {
                const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
                const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
                
                const x1 = radius + (radius - 10) * Math.cos(startAngle)
                const y1 = radius + (radius - 10) * Math.sin(startAngle)
                const x2 = radius + (radius - 10) * Math.cos(endAngle)
                const y2 = radius + (radius - 10) * Math.sin(endAngle)
                
                const largeArcFlag = segmentAngle > 180 ? 1 : 0
                
                const pathData = [
                  `M ${radius} ${radius}`,
                  `L ${x1} ${y1}`,
                  `A ${radius - 10} ${radius - 10} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ')

                return (
                  <g key={segment.id}>
                    <path
                      d={pathData}
                      fill={segment.color}
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                    />
                    {/* Text */}
                    <text
                      x={radius + (radius - 40) * Math.cos((startAngle + endAngle) / 2)}
                      y={radius + (radius - 40) * Math.sin((startAngle + endAngle) / 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {segment.label.length > 12 ? segment.label.substring(0, 10) + '...' : segment.label}
                    </text>
                  </g>
                )
              })}
              
              {/* Center circle */}
              <circle
                cx={radius}
                cy={radius}
                r={25}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="3"
              />
              
              {/* Center logo/icon */}
              <text
                x={radius}
                y={radius}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="20"
                fontWeight="bold"
              >
                $
              </text>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="text-center space-y-4">
        <Button
          onClick={handleSpin}
          disabled={!canSpin}
          variant="hero"
          size="lg"
          className="px-8 py-3 text-lg font-semibold"
        >
          {isSpinning ? (
            <>
              <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
              Spinning...
            </>
          ) : cooldownActive ? (
            <>
              <RotateCcw className="w-5 h-5 mr-2" />
              Cooldown (5s)
            </>
          ) : (
            <>
              <Coins className="w-5 h-5 mr-2" />
              Spin for {spinPrice} $HYPE
            </>
          )}
        </Button>
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Spins today: {userSpinsToday}/{maxSpinsPerDay}</span>
          <Badge variant="outline">
            Pool: ${dailyPool.toLocaleString()}
          </Badge>
        </div>
      </div>

      {/* Last Result */}
      {lastResult && (
        <Card className="w-full max-w-sm border border-primary/20 bg-card/50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <lastResult.icon className="w-5 h-5 mr-2" style={{ color: lastResult.color }} />
              <span className="font-semibold">Last Result</span>
            </div>
            <p className="text-lg font-bold" style={{ color: lastResult.color }}>
              {lastResult.label}
            </p>
            {typeof lastResult.amount === 'number' && lastResult.amount > 0 && (
              <p className="text-sm text-muted-foreground">
                Amount: {lastResult.amount}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}