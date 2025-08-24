import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Chrome } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandMark } from '@/components/Brand';

export const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to gender selection
    // Backend authentication would be implemented here
    navigate('/onboarding');
  };

  const handleGoogleSignIn = () => {
    // Google OAuth would be implemented here
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <BrandMark size={48} className="mb-3 mx-auto" />
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            {t('appName')}
          </h1>
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full tier-glow" />
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {isSignIn ? t('welcomeBack') : t('unleashStrength')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isSignIn ? t('signInSubtitle') : t('signUpSubtitle')}
          </p>
        </div>

        <Card className="tier-card border border-border backdrop-blur-xl">
          <CardHeader className="pb-4">
            <h3 className="text-xl font-semibold text-foreground text-center">
              {isSignIn ? t('signIn') : t('createAccount')}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('firstName')}
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('lastName')}
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('email')}
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {t('password')}
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-primary-foreground hover:bg-gradient-primary/90 font-semibold py-3 transition-all duration-300 hover:scale-105 tier-glow"
              >
                {isSignIn ? t('signIn') : t('signUp')}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-border" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-3 text-sm text-muted-foreground">{t('or')}</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-transparent border-border text-foreground hover:bg-accent/10 hover:border-accent py-3 transition-all duration-300"
            >
              <Chrome className="w-5 h-5 mr-2" />
              {t('continueWithGoogle')}
            </Button>

            <div className="text-center pt-4">
              <p className="text-muted-foreground text-sm">
                {isSignIn ? t('dontHaveAccount') : t('alreadyHaveAccount')}{" "}
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-accent hover:text-accent/80 font-medium transition-colors underline-offset-4 hover:underline"
                >
                  {isSignIn ? t('signUp') : t('signIn')}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('termsAndPrivacy').split('Terms of Service')[0]}
            <button className="text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline">
              {t('termsOfService')}
            </button>
            {t('termsAndPrivacy').split('Terms of Service')[1]?.split('Privacy Policy')[0] || ' and '}
            <button className="text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline">
              {t('privacyPolicy')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};