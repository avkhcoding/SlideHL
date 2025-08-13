import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectWallet } from './ConnectWallet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, RotateCcw, Trophy, BarChart3, Gift, Coins, Star } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: RotateCcw },
  { name: 'Roulette', href: '/roulette', icon: Trophy },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Rewards', href: '/rewards', icon: Gift },
]

interface HeaderProps {
  userPoints?: number
  userBalance?: number
}

export function Header({ userPoints, userBalance }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Slide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-card-foreground/80 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop User Stats & Wallet */}
          <div className="hidden md:flex items-center space-x-4">
            {userPoints !== undefined && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <Star className="w-3 h-3 mr-1" />
                  {userPoints.toLocaleString()}
                </Badge>
              </div>
            )}
            {userBalance !== undefined && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  <Coins className="w-3 h-3 mr-1" />
                  {userBalance.toFixed(3)} $HYPE
                </Badge>
              </div>
            )}
            <ConnectWallet />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card border-border">
                <div className="flex flex-col space-y-6 py-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                      Slide
                    </span>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-primary bg-primary/10'
                              : 'text-card-foreground/80 hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="pt-4 border-t border-border space-y-4">
                    {/* Mobile User Stats */}
                    {(userPoints !== undefined || userBalance !== undefined) && (
                      <div className="space-y-3">
                        {userPoints !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-card-foreground/80">Points</span>
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              <Star className="w-3 h-3 mr-1" />
                              {userPoints.toLocaleString()}
                            </Badge>
                          </div>
                        )}
                        {userBalance !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-card-foreground/80">Balance</span>
                            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                              <Coins className="w-3 h-3 mr-1" />
                              {userBalance.toFixed(3)} $HYPE
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <ConnectWallet />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}