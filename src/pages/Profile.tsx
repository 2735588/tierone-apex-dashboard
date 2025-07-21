import { User, Settings, Trophy, Target, Zap, Edit3, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const userStats = [
    { label: "TierScore", value: "2,847", icon: Trophy, color: "text-tier-gold" },
    { label: "Global Rank", value: "#127", icon: Target, color: "text-accent" },
    { label: "Workouts", value: "156", icon: Zap, color: "text-primary" },
  ];

  const settingsOptions = [
    { title: "Notifications", subtitle: "Push alerts & reminders", icon: Bell },
    { title: "Privacy", subtitle: "Data & sharing settings", icon: Shield },
    { title: "Account", subtitle: "Personal information", icon: User },
    { title: "App Settings", subtitle: "Preferences & display", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Profile Header */}
      <div className="tier-card rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center tier-glow">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Alex Martinez</h2>
            <p className="text-muted-foreground">@alextheapex</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-accent rounded-full energy-pulse"></div>
              <span className="text-sm text-accent">Active now</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-4">
          Fitness enthusiast | Apex tier athlete | Pushing limits daily 💪
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Records */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-tier-gold" />
          Personal Records
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Bench Press</span>
            <span className="font-semibold text-foreground">185 lbs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Deadlift</span>
            <span className="font-semibold text-foreground">315 lbs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Squat</span>
            <span className="font-semibold text-foreground">275 lbs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">5K Time</span>
            <span className="font-semibold text-foreground">22:34</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Settings</h3>
        
        <div className="space-y-1">
          {settingsOptions.map((option, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
            >
              <option.icon className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium text-foreground">{option.title}</div>
                <div className="text-xs text-muted-foreground">{option.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tier Badge */}
      <div className="tier-card rounded-xl p-4 text-center">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 tier-glow">
          <Trophy className="w-6 h-6 text-primary-foreground" />
        </div>
        <h4 className="font-bold text-accent mb-1">APEX TIER</h4>
        <p className="text-xs text-muted-foreground">Top 2% of all athletes</p>
      </div>
    </div>
  );
};

export default Profile;