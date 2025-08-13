import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  subtitle?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon, subtitle, trend, className = '' }: StatsCardProps) {
  return (
    <Card className={`card-hover border-border bg-gradient-to-br from-card to-card/50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-card-foreground/80">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-card-foreground/70">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center text-xs font-medium ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}>
                <span>{trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{trend.value}</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}