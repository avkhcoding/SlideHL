import { useCallback } from 'react'

declare const confetti: any

export const useConfetti = () => {
  const fireConfetti = useCallback(() => {
    // Import confetti dynamically to avoid SSR issues
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default
        
        // Basic confetti burst
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      })
    }
  }, [])

  const fireBigWinConfetti = useCallback(() => {
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default
        
        // Multiple bursts for big wins
        const count = 200
        const defaults = {
          origin: { y: 0.7 }
        }

        function fire(particleRatio: number, opts: any) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          })
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        })
        fire(0.2, {
          spread: 60,
        })
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        })
      })
    }
  }, [])

  const fireNeonConfetti = useCallback(() => {
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default
        
        // Neon-colored confetti for mystery prizes
        confetti({
          particleCount: 150,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#98FCE4', '#C8FF00', '#FF6B6B']
        })
      })
    }
  }, [])

  return {
    fireConfetti,
    fireBigWinConfetti,
    fireNeonConfetti
  }
}