import { Home, Dumbbell, BarChart3, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/workouts", icon: Dumbbell, label: "Workouts" },
    { path: "/progress", icon: BarChart3, label: "Progress" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

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