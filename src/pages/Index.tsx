import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGender } from '@/contexts/GenderContext';
import Home from './Home';
import { BrandMark } from '@/components/Brand';

const Index = () => {
  const { isOnboarded } = useGender();
  const navigate = useNavigate();

  useEffect(() => {
    // If user hasn't completed onboarding, redirect to signup
    if (!isOnboarded) {
      navigate('/signup');
      return;
    }
    // If onboarded, show the home page
  }, [isOnboarded, navigate]);

  // Show loading state while checking onboarding status
  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <BrandMark size={24} className="animate-pulse" />
          <span className="text-foreground">Loading TierOne...</span>
        </div>
      </div>
    );
  }

  // Show the new home page for onboarded users
  return <Home />;
};

export default Index;