import { User, Edit, Settings, Trophy, Target, Calendar, Share, Award, Video, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Profile = () => {
  const [bio, setBio] = useState("Dedicated athlete pushing limits every day. 💪 Always striving for greatness and inspiring others to reach their peak performance. 🔥");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const streakDays = 47;

  const earnedBadges = [
    { name: "Iron Beast", tier: "Silver", icon: "🛡️" },
    { name: "Tier Crusher", tier: "Bronze", icon: "🏆" },
  ];

  const topAchievements = [
    { exercise: "Bench Press", weight: 315, unit: "lbs" },
    { exercise: "Deadlift", weight: 495, unit: "lbs" },
    { exercise: "Squat", weight: 405, unit: "lbs" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Elite athlete profile and achievements</p>
      </div>

      {/* Profile Card */}
      <div className="tier-card rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center tier-glow">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Alex Thompson</h2>
            <p className="text-muted-foreground">@alex_athlete</p>
            <div className="flex items-center gap-2 mt-1">
              <Trophy className="w-4 h-4 text-tier-gold" />
              <span className="text-sm text-tier-gold">Apex Tier</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400">{streakDays} day streak</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Editable Bio */}
        <div className="mb-4">
          {isEditingBio ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
                placeholder="Add emojis to make your bio shine! ✨"
                className="w-full p-2 bg-muted rounded-lg text-sm text-foreground resize-none"
                rows={3}
              />
              <div className="text-xs text-muted-foreground text-right">
                {bio.length}/150 characters
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setIsEditingBio(false)}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditingBio(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
              onClick={() => setIsEditingBio(true)}
            >
              {bio}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">2847</div>
            <div className="text-xs text-muted-foreground">TierScore</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-tier-gold">#12</div>
            <div className="text-xs text-muted-foreground">National</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">#1,847</div>
            <div className="text-xs text-muted-foreground">Global</div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-tier-gold" />
          Earned Badges ({earnedBadges.length})
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {earnedBadges.map((badge, index) => (
            <div key={index} className="tier-card rounded-lg p-3 text-center tier-glow">
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-sm font-bold text-foreground">{badge.name}</div>
              <div className="text-xs text-tier-gold">{badge.tier}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned Records */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Video className="w-4 h-4 text-accent" />
          Pinned Records (3/3)
        </h3>
        
        <div className="space-y-3">
          {topAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{achievement.exercise}</div>
                  <div className="text-xs text-muted-foreground">Personal Record</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-accent">{achievement.weight}</div>
                <div className="text-xs text-muted-foreground">{achievement.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="tier" className="w-full h-12 text-lg">
          <Share className="w-5 h-5 mr-2" />
          Share Profile
        </Button>
        
        <Button variant="outline" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Account Settings
        </Button>
      </div>
    </div>
  );
};

export default Profile;