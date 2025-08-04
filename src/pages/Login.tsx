import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import SecurityPatternGrid from '@/components/SecurityPatternGrid';

const Login = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    accountNumber: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePatternSelect = (cellIndex: number) => {
    if (selectedPattern.includes(cellIndex)) {
      setSelectedPattern(prev => prev.filter(cell => cell !== cellIndex));
    } else if (selectedPattern.length < 5) {
      setSelectedPattern(prev => [...prev, cellIndex]);
    }
  };

  const handleLogin = () => {
    console.log('Login Data:', {
      credentials: formData,
      securityPattern: selectedPattern
    });
    // Here you would typically authenticate with your backend
    alert('Login successful! (Demo)');
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.accountNumber;
      case 2:
        return selectedPattern.length === 5;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Secure Login</CardTitle>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter your account number"
                />
              </div>


              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!isStepValid(1)}
              >
                Generate Authentication QR
              </Button>

              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Security Pattern</CardTitle>
              <p className="text-muted-foreground">
                Enter your security pattern to complete login
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <SecurityPatternGrid
                selectedCells={selectedPattern}
                onCellSelect={handlePatternSelect}
              />

              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={handleLogin}
                  disabled={!isStepValid(2)}
                >
                  Login to Account
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(1)}
                >
                  Back to Credentials
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="min-h-[600px] flex items-center justify-center">
          {renderStep()}
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-muted rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Security Notice</h3>
          <p className="text-muted-foreground text-sm">
            For your security, never share your login credentials or security pattern with anyone. 
            Big Secure Bank will never ask for this information via email or phone calls.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;