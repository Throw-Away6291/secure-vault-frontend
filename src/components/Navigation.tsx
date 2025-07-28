import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Big Secure Bank
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant={location.pathname === '/register' ? 'default' : 'outline'}
              asChild
            >
              <Link to="/register">Register</Link>
            </Button>
            <Button
              variant={location.pathname === '/login' ? 'default' : 'outline'}
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;