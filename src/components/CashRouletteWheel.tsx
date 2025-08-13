import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, RotateCcw, Sparkles, Gift, Repeat, Zap } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useConfetti } from '@/hooks/useConfetti'
import { useSound } from '@/hooks/useSound'

export interface CashRouletteSegment {
  id: string
  label: string
  type: 'none' | 'points_multiplier' | 'instant_payout' | 'mixed' | 'mystery'
  amount: number | string
  probability: number
  color: string
  icon: React.ComponentType<any>
}

const segments: CashRouletteSegment[] = [
  { id: '1', label: 'Try Again', type: 'none', amount: 0, probability: 25, color: 'hsl(var(--muted))', icon: Repeat },
  { id: '2', label: 'Try Again', type: 'none', amount: 0, probability: 25, color: 'hsl(var(--muted))', icon: Repeat },
  { id: '3', label: 'Points 1.2x', type: 'points_multiplier', amount: 1.2, probability: 15, color: 'hsl(var(--primary))', icon: Sparkles },
  { id: '4', label: 'Points 2x', type: 'points_multiplier', amount: 2, probability: 10, color: 'hsl(var(--accent))', icon: Sparkles },
  { id: '5', label: 'Cash 15%', type: 'instant_payout', amount: '15%', probability: 8, color: 'hsl(var(--success))', icon: Coins },
  { id: '6', label: 'Cash 25%', type: 'instant_payout', amount: '25%', probability: 6, color: 'hsl(var(--success-glow))', icon: Coins },
  { id: '7', label: 'Cash 40%', type: 'instant_payout', amount: '40%', probability: 4, color: 'hsl(var(--warning))', icon: Coins },
  { id: '8', label: 'Cash 60% + 5x', type: 'mixed', amount: '60% + 5x', probability: 2, color: 'hsl(var(--destructive))', icon: Zap },
  { id: '9', label: 'Mystery Prize', type: 'mystery', amount: 'Special', probability: 5, color: 'hsl(242 99% 71%)', icon: Gift }
]

interface CashRouletteWheelProps {
  dailyPool: number
  userSpinsToday: number
  maxSpinsPerDay: number
  spinPrice: number
  onSpin: (result: CashRouletteSegment) => void
  disabled?: boolean
}

export function CashRouletteWheel({ 
  dailyPool, 
  userSpinsToday, 
  maxSpinsPerDay, 
  spinPrice, 
  onSpin, 
  disabled = false 
}: CashRouletteWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastResult, setLastResult] = useState<CashRouletteSegment | null>(null)
  const [cooldownActive, setCooldownActive] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)
  const controls = useAnimation()
  const { toast } = useToast()
  const { fireConfetti, fireBigWinConfetti, fireNeonConfetti } = useConfetti()
  const { playSpinSound, playWinSound, playBigWinSound } = useSound()
  
  const canSpin = !disabled && !isSpinning && !cooldownActive && userSpinsToday < maxSpinsPerDay

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (cooldownActive && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            setCooldownActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cooldownActive, cooldownTime])

  const getRandomSegment = (): CashRouletteSegment => {
    const totalWeight = segments.reduce((sum, segment) => sum + segment.probability, 0)
    let random = Math.random() * totalWeight
    
    for (const segment of segments) {
      random -= segment.probability
      if (random <= 0) {
        return segment
      }
    }
    return segments[0]
  }

  const handleSpin = async () => {
    if (!canSpin) return

    setIsSpinning(true)
    playSpinSound()
    const result = getRandomSegment()
    
    const segmentIndex = segments.findIndex(s => s.id === result.id)
    const segmentAngle = 360 / segments.length
    const targetAngle = segmentIndex * segmentAngle
    const fullRotations = 360 * 4 + Math.random() * 360
    const finalAngle = fullRotations + (360 - targetAngle)
    
    try {
      await controls.start({
        rotate: finalAngle,
        transition: { 
          duration: 3.5,
          ease: [0.17, 0.67, 0.12, 0.99]
        }
      })
      
      setLastResult(result)
      onSpin(result)
      
      if (result.type !== 'none') {
        // Trigger appropriate effects based on prize value
        if (result.type === 'instant_payout' && typeof result.amount === 'string' && 
            (result.amount.includes('40%') || result.amount.includes('60%'))) {
          fireBigWinConfetti()
          playBigWinSound()
        } else if (result.type === 'mystery') {
          fireNeonConfetti()
          playWinSound()
        } else {
          fireConfetti()
          playWinSound()
        }
        
        toast({
          title: "🎉 Winner!",
          description: `You won: ${result.label}`,
          duration: 5000,
        })
      }
      
    } catch (error) {
      console.error('Spin animation failed:', error)
    } finally {
      setIsSpinning(false)
      setCooldownActive(true)
      setCooldownTime(15)
    }
  }

  const segmentAngle = 360 / segments.length
  const radius = 140

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 overflow-hidden">
      <CardContent className="p-6 text-center">
        {/* Title */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-card-foreground mb-2">Cash Value Roulette</h3>
          <Badge variant="outline" className="bg-destructive text-destructive-foreground border-destructive">
            0.04 $HYPE per spin
          </Badge>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary drop-shadow-lg" />
          </div>
          
          {/* Wheel */}
          <div className="relative mx-auto" style={{ width: radius * 2, height: radius * 2 }}>
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
                      <text
                        x={radius + (radius - 35) * Math.cos((startAngle + endAngle) / 2)}
                        y={radius + (radius - 35) * Math.sin((startAngle + endAngle) / 2)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={segment.color === 'hsl(var(--muted))' ? 'hsl(var(--muted-foreground))' : 'white'}
                        fontSize="9"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                      >
                        {segment.label.length > 10 ? segment.label.substring(0, 8) + '...' : segment.label}
                      </text>
                    </g>
                  )
                })}
                
                {/* Center circle */}
                <circle
                  cx={radius}
                  cy={radius}
                  r={20}
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--card))"
                  strokeWidth="3"
                />
                
                <text
                  x={radius}
                  y={radius}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(var(--primary-foreground))"
                  fontSize="16"
                  fontWeight="bold"
                >
                  $
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Spin Button */}
        <div className="space-y-4">
          <Button
            onClick={handleSpin}
            disabled={!canSpin}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 text-lg font-semibold rounded-xl"
            size="lg"
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
                Spinning...
              </>
            ) : cooldownActive ? (
              <>
                <RotateCcw className="w-5 h-5 mr-2" />
                Cooldown ({cooldownTime}s)
              </>
            ) : (
              <>
                <Coins className="w-5 h-5 mr-2" />
                Spin for 0.04 $HYPE
              </>
            )}
          </Button>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Spins: {userSpinsToday}/20</span>
            <Badge variant="outline" className="bg-card text-card-foreground">
              Pool: ${dailyPool.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Last Result */}
        {lastResult && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <div className="flex items-center justify-center mb-2">
              <lastResult.icon className="w-5 h-5 mr-2" style={{ color: lastResult.color }} />
              <span className="font-semibold text-card-foreground">Last Result</span>
            </div>
            <p className="text-lg font-bold text-card-foreground">
              {lastResult.label}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}