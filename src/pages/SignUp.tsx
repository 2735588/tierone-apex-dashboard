import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Chrome } from 'lucide-react';

export const SignUp = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            TierOne
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-white/50 to-white/20 mx-auto rounded-full" />
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignIn ? 'Welcome Back' : 'Unleash Your Strength'}
          </h2>
          <p className="text-gray-400 text-lg">
            {isSignIn ? 'Sign in to continue your journey' : 'Join the elite fitness tracking experience'}
          </p>
        </div>

        <Card className="bg-gray-900/50 border border-gray-800 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <h3 className="text-xl font-semibold text-white text-center">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-white/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-white/30"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-white/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-white/30"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gray-900 px-3 text-sm text-gray-400">or</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800/50 hover:border-gray-600 py-3 transition-all duration-300"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-white hover:text-gray-300 font-medium transition-colors underline-offset-4 hover:underline"
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            By signing up, you agree to our{" "}
            <button className="text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};