import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from '@/utils/translations';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  availableLanguages: Language[];
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Load saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage');
    return languages.find(lang => lang.code === savedLanguage) || languages[0];
  });

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language.code);
  };

  const t = (key: keyof typeof translations.en): string => {
    const languageTranslations = translations[currentLanguage.code as keyof typeof translations];
    return languageTranslations?.[key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        availableLanguages: languages,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};