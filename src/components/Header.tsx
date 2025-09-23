import { Button } from '@/components/ui/button';
import { Bell, MessageCircle, User } from 'lucide-react';
import bizTraderLogo from '@/assets/biztrader-logo-new.png';
interface HeaderProps {}
export const Header = () => {
  return <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img src={bizTraderLogo} alt="BizTrader" className="h-8 w-auto" />
          </div>
          
          {/* Navigation Links - Center with generous spacing */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Buy a business
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Sell a business
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Franchise
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Find brokers
            </a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Advice & tips
            </a>
          </nav>
          
          {/* Right Side - Auth Links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Sign in
            </a>
            <span className="text-muted-foreground">|</span>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
              Register
            </a>
          </div>
        </div>
      </div>
    </header>;
};