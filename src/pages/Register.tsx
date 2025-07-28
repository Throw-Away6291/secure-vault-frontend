import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import SecurityPatternGrid from '@/components/SecurityPatternGrid';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: undefined as Date | undefined,
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    aadharNumber: '',
    panNumber: '',
    accountNumber: '',
    accountType: '',
    bankingFacility: '',
    termsAccepted: false,
  });

  const [kycAnswers, setKycAnswers] = useState<string[]>(new Array(10).fill(''));
  const [selectedPattern, setSelectedPattern] = useState<number[]>([]);
  const [signature, setSignature] = useState('');

  const kycQuestions = [
    "What was your childhood nickname?",
    "What is the name of your first school?",
    "What bank did your parents use when you were a child?",
    "What was the name of your first pet?",
    "In which city were you born?",
    "What is your mother's maiden name?",
    "What was the make of your first car?",
    "What is the name of the street you grew up on?",
    "What was your favorite subject in school?",
    "What is the name of your favorite childhood friend?"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKycAnswerChange = (index: number, value: string) => {
    const newAnswers = [...kycAnswers];
    newAnswers[index] = value;
    setKycAnswers(newAnswers);
  };

  const handlePatternSelect = (cellIndex: number) => {
    if (selectedPattern.includes(cellIndex)) {
      setSelectedPattern(prev => prev.filter(cell => cell !== cellIndex));
    } else if (selectedPattern.length < 5) {
      setSelectedPattern(prev => [...prev, cellIndex]);
    }
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.email && formData.phone;
      case 2:
        return formData.addressLine1 && formData.city && formData.state && 
               formData.pinCode && formData.aadharNumber && formData.panNumber;
      case 3:
        return formData.accountNumber && formData.accountType && formData.bankingFacility;
      case 4:
        return kycAnswers.every(answer => answer.trim() !== '');
      case 5:
        return selectedPattern.length === 5;
      case 6:
        return formData.termsAccepted && signature.trim() !== '';
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    console.log('Registration Data:', {
      personalInfo: formData,
      kycAnswers,
      securityPattern: selectedPattern,
      signature
    });
    // Here you would typically send the data to your backend
    alert('Registration completed successfully! (Demo)');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <Label>Date of Birth *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date of birth"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) => handleInputChange('dateOfBirth', date)}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Address & Identity Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                  placeholder="Building, street, area"
                />
              </div>

              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                  placeholder="Landmark, locality (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    placeholder="PIN Code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                  <Input
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Banking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <Label>Account Type *</Label>
                <Select onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="salary">Salary Account</SelectItem>
                    <SelectItem value="fd">Fixed Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Internet Banking Facility *</Label>
                <RadioGroup
                  value={formData.bankingFacility}
                  onValueChange={(value) => handleInputChange('bankingFacility', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="view-only" id="view-only" />
                    <Label htmlFor="view-only">View Only - Check balance and transaction history</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-access" id="full-access" />
                    <Label htmlFor="full-access">View and Fund Transfer - Full banking access</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-6">
                Please answer these personal questions to verify your identity. Only you should know these answers.
              </p>
              {kycQuestions.map((question, index) => (
                <div key={index}>
                  <Label htmlFor={`kyc-${index}`} className="text-sm font-medium">
                    {index + 1}. {question}
                  </Label>
                  <Input
                    id={`kyc-${index}`}
                    value={kycAnswers[index]}
                    onChange={(e) => handleKycAnswerChange(index, e.target.value)}
                    placeholder="Your answer"
                    className="mt-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Security Pattern Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Create a unique security pattern by selecting exactly 5 cells in a specific order. 
                This pattern will be used as an additional security measure during login.
              </p>
              <SecurityPatternGrid
                selectedCells={selectedPattern}
                onCellSelect={handlePatternSelect}
              />
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">6</span>
                Terms & Signature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-top space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the <Link to="#" className="text-primary underline">Terms and Conditions</Link> and 
                  <Link to="#" className="text-primary underline ml-1">Privacy Policy</Link> of Big Secure Bank. 
                  I understand that this is a secure banking platform and all information provided is accurate.
                </Label>
              </div>

              <div>
                <Label htmlFor="signature">Digital Signature *</Label>
                <Input
                  id="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your full name as digital signature"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  By typing your name, you agree to use it as your digital signature for this application.
                </p>
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
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Registration</h1>
          <p className="text-muted-foreground">
            Complete all steps to create your Big Secure Bank account
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                  stepNumber < step ? "bg-success text-success-foreground" :
                  stepNumber === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {stepNumber < step ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 6 && (
                  <div className={cn(
                    "w-full h-1 mx-2",
                    stepNumber < step ? "bg-success" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-muted-foreground">
              Step {step} of 6
            </span>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          {step < 6 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid(step)}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid(step)}
              className="bg-success hover:bg-success/90"
            >
              Complete Registration
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;