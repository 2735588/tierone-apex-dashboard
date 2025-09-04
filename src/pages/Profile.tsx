import { Edit, Plus, Play, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { TierScoreBadgeView } from "@/components/TierScoreBadgeView";
import StreakFlame from "@/components/StreakFlame";
import VideoModal from "@/components/VideoModal";
import { fetchCurrentPRs, getStreak, type PRRecord } from "@/lib/api";
import { kgToLb } from "@/lib/pr";

const Profile = () => {
  const [bio, setBio] = useState("Dedicated athlete pushing limits every day. 💪 Always striving for greatness and inspiring others to reach their peak performance. 🔥");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isLbs, setIsLbs] = useState(true);
  const [prs, setPrs] = useState<Record<string, PRRecord>>({});
  const [streak, setStreak] = useState({ days: 0, loggedToday: false });
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  // Mock user data
  const user = {
    name: "Alex Thompson",
    username: "alex_athlete", 
    avatar: "/lovable-uploads/0a7c5346-a421-499f-90e7-385107439d7c.png",
    tierScore: 67, // Silver tier (60-69)
    percentile: 15 // Not top 1%, so Silver
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prsData, streakData] = await Promise.all([
          fetchCurrentPRs(),
          getStreak()
        ]);
        setPrs(prsData);
        setStreak(streakData);
      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    };
    loadData();
  }, []);

  const formatValue = (valueKg: number) => {
    if (isLbs) {
      return `${kgToLb(valueKg)} lbs`;
    }
    return `${valueKg} kg`;
  };

  const getTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Bio */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Bio */}
        <div className="w-full">
          {isEditingBio ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
                placeholder="Add emojis to make your bio shine! ✨"
                className="w-full p-3 bg-muted rounded-xl text-sm text-foreground resize-none border-0 focus:ring-2 focus:ring-primary"
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
            <p 
              className="text-sm text-foreground cursor-pointer hover:text-muted-foreground transition-colors leading-relaxed"
              onClick={() => setIsEditingBio(true)}
            >
              {bio}
            </p>
          )}
        </div>
      </div>

      {/* Centered TierScore Badge */}
      <div className="px-4 py-6">
        <TierScoreBadgeView 
          score={user.tierScore} 
          percentile={user.percentile}
          size={96}
        />
      </div>

      {/* Streak */}
      <div className="px-4 pb-6">
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Streak</p>
          <div className="flex items-center justify-center gap-3">
            <StreakFlame days={streak.days} size={32} />
            <div>
              <div className="text-4xl font-bold text-emerald-400">{streak.days}</div>
              <div className="text-xs text-muted-foreground">days strong</div>
            </div>
          </div>
          {!streak.loggedToday && (
            <p className="text-xs text-muted-foreground">
              Keep it alive: {getTimeLeft()} left today
            </p>
          )}
        </div>
      </div>

      {/* PR Records */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Personal Records</h2>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add PR
          </Button>
        </div>

        <div className="space-y-3">
          {Object.entries(prs).map(([lift, record]) => (
            <div key={lift} className="bg-card rounded-2xl p-4 border border-border shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{lift}</h3>
                  <p className="text-xs text-muted-foreground">Personal Record</p>
                  {record.updatedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(record.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-accent">
                    {formatValue(record.valueKg)}
                  </div>
                  <button
                    onClick={() => setIsLbs(!isLbs)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isLbs ? 'kg' : 'lbs'}
                  </button>
                </div>
                
                <Button variant="ghost" size="sm" className="ml-2">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Video Thumbnails */}
              {record.proofUrl && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setSelectedVideo({ url: record.proofUrl!, title: lift })}
                    className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <Play className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {Object.keys(prs).length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No PRs yet. Upload your first PR.</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload PR
            </Button>
          </div>
        )}
      </div>

      {/* Delete Photos Button */}
      <div className="px-4 pb-6">
        <Button 
          variant="outline" 
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => {
            localStorage.clear();
            toast({
              title: "Photos deleted",
              description: "All your photos and scan data have been permanently deleted.",
            });
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete My Photos
        </Button>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
};

export default Profile;