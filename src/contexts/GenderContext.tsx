import React, { createContext, useContext, useState, useEffect } from 'react';

export type Gender = 'male' | 'female' | null;

interface GenderContextType {
  gender: Gender;
  setGender: (gender: Gender) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export const useGender = () => {
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
};

export const GenderProvider = ({ children }: { children: React.ReactNode }) => {
  const [gender, setGenderState] = useState<Gender>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedGender = localStorage.getItem('tierone-gender') as Gender;
    const savedOnboarding = localStorage.getItem('tierone-onboarded') === 'true';
    
    if (savedGender) {
      setGenderState(savedGender);
    }
    if (savedOnboarding) {
      setIsOnboarded(savedOnboarding);
    }
  }, []);

  const setGender = (newGender: Gender) => {
    setGenderState(newGender);
    if (newGender) {
      localStorage.setItem('tierone-gender', newGender);
    } else {
      localStorage.removeItem('tierone-gender');
    }
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('tierone-onboarded', 'true');
  };

  return (
    <GenderContext.Provider value={{ gender, setGender, isOnboarded, completeOnboarding }}>
      {children}
    </GenderContext.Provider>
  );
};