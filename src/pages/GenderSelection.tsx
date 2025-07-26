import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, User, Users } from 'lucide-react';
import { useGender, Gender } from '@/contexts/GenderContext';

const GenderSelection = () => {
  const { setGender, completeOnboarding } = useGender();
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const navigate = useNavigate();

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender) {
      setGender(selectedGender);
      completeOnboarding();
      // Navigate to home page, not root
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center tier-glow">
          <Flame className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">TierOne</h1>
          <p className="text-sm text-muted-foreground">Elite Fitness Tracking</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-8 max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-3">Welcome to TierOne</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Let's personalize your fitness journey. Choose your experience to get tailored muscle group priorities and improvement tips.
        </p>
      </div>

      {/* Gender Selection Cards */}
      <div className="grid gap-4 w-full max-w-md mb-8">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedGender === 'male' ? 'tier-glow border-accent' : 'tier-card hover:border-accent/50'
          }`}
          onClick={() => handleGenderSelect('male')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                selectedGender === 'male' ? 'border-accent bg-accent/10' : 'border-muted'
              }`}>
                <User className={`w-6 h-6 ${selectedGender === 'male' ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Male</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on strength, size, and performance metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedGender === 'female' ? 'tier-glow border-accent' : 'tier-card hover:border-accent/50'
          }`}
          onClick={() => handleGenderSelect('female')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                selectedGender === 'female' ? 'border-accent bg-accent/10' : 'border-muted'
              }`}>
                <Users className={`w-6 h-6 ${selectedGender === 'female' ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Female</h3>
                <p className="text-sm text-muted-foreground">
                  Emphasize toning, strength, and balanced development
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <Button 
        onClick={handleContinue}
        disabled={!selectedGender}
        className="w-full max-w-md bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground py-3 rounded-full font-bold tier-glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to TierOne
      </Button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
        You can change this selection later in your profile settings.
      </p>
    </div>
  );
};

export default GenderSelection;