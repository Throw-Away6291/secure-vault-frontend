import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Lock, CreditCard, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Big Secure Bank
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            India's most trusted digital banking platform. Experience secure, 
            convenient, and modern banking solutions designed for your financial success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 py-4">
              <Link to="/register">Open Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 py-4">
              <Link to="/login">Internet Banking</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bank-Grade Security</h3>
            <p className="text-muted-foreground text-sm">
              Advanced encryption and multi-factor authentication to protect your assets
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
            <p className="text-muted-foreground text-sm">
              Real-time fraud detection and secure payment processing
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Digital Banking</h3>
            <p className="text-muted-foreground text-sm">
              Complete banking services available 24/7 from anywhere
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Trusted by Millions</h3>
            <p className="text-muted-foreground text-sm">
              Join millions of satisfied customers across India
            </p>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Security is Our Priority</h2>
          <p className="text-muted-foreground">
            Big Secure Bank employs the latest in cybersecurity technology to ensure 
            your financial information remains safe and secure. We never ask for sensitive 
            information via email or phone calls.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;