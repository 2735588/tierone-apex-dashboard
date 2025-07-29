import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGender } from '@/contexts/GenderContext';
import Home from './Home';

const Index = () => {
  const { gender, isOnboarded } = useGender();
  const navigate = useNavigate();

  useEffect(() => {
    // If user hasn't completed onboarding, redirect to gender selection
    if (!isOnboarded) {
      navigate('/onboarding');
      return;
    }

    // If user has completed onboarding and selected gender, redirect to appropriate experience
    if (gender === 'male') {
      navigate('/male');
    } else if (gender === 'female') {
      navigate('/female');
    }
  }, [gender, isOnboarded, navigate]);

  // Show loading state while redirecting
  if (!isOnboarded || gender) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center tier-glow animate-pulse">
            <span className="text-sm font-bold text-primary-foreground">T1</span>
          </div>
          <span className="text-foreground">Loading TierOne...</span>
        </div>
      </div>
    );
  }

  return <Home />;
};

export default Index;
