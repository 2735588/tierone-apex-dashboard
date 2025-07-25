import { Home, BarChart3, User, Trophy, Crown, Zap } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useGender } from "@/contexts/GenderContext";

export const BottomNavigation = () => {
  const location = useLocation();
  const { gender, isOnboarded } = useGender();
  
  // Don't show navigation during onboarding
  if (!isOnboarded || location.pathname === '/onboarding') {
    return null;
  }

  // Get the appropriate home path based on gender
  const getHomePath = () => {
    if (gender === 'male') return '/male';
    if (gender === 'female') return '/female';
    return '/';
  };

  const navItems = [
    { path: getHomePath(), icon: Home, label: "Home" },
    { path: "/progress-badges", icon: BarChart3, label: "Progress" },
    { path: "/leaderboard", icon: Crown, label: "Leaderboard" },
    { path: "/achievements", icon: Trophy, label: "Achievements" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === getHomePath()) {
      return location.pathname === '/male' || location.pathname === '/female' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? "text-accent tier-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon 
              className={`w-5 h-5 ${
                isActive(item.path) ? "energy-pulse" : ""
              }`} 
            />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};