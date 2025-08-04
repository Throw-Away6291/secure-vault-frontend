import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateQR = async () => {
    console.log('Generating QR for account:', formData.accountNumber);
    
    // TODO: Implement QR generation logic
    // This will integrate with your mobile auth app
    // Example: await generateAuthQR(formData.accountNumber);
    
    alert('QR Code generated! Please scan with your mobile auth app. (Demo)');
  };

  const isFormValid = () => {
    return formData.accountNumber.trim() !== '';
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
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Secure Login</CardTitle>
              <p className="text-muted-foreground">
                Enter your account number to generate authentication QR
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
                onClick={handleGenerateQR}
                disabled={!isFormValid()}
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
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-muted rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Security Notice</h3>
          <p className="text-muted-foreground text-sm">
            For your security, never share your account credentials with anyone. 
            Big Secure Bank will never ask for this information via email or phone calls.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;