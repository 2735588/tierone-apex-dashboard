import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TierScoreBadgeView } from '@/components/TierScoreBadgeView';
import { StreakCard } from '@/components/StreakCard';
import PRCard from '@/components/PRCard';
import { fetchCurrentPRs, getStreak } from '@/lib/api';
import { PRRecord } from '@/lib/api';
import VideoModal from '@/components/VideoModal';
import { MAIN_LIFTS } from '@/lib/pr';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bio, setBio] = useState("Conquering strength goals every day 💪 | 3x national medalist | Always hungry for more 🔥");
  const [isEditing, setIsEditing] = useState(false);
  const [prs, setPrs] = useState<Record<string, PRRecord>>({});
  const [streak, setStreak] = useState(12);
  const [hasLoggedToday] = useState(false);
  const [videoModal, setVideoModal] = useState<{ open: boolean; title: string; url: string }>({
    open: false,
    title: "",
    url: ""
  });

  // Mock data - replace with actual user data
  const isOwner = true; // This should come from auth context
  const userData = {
    name: "Alex Morgan",
    age: 28,
    handle: "alexmorgan",
    avatar: "/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png",
    athleteType: "Hybrid Athlete"
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prsData, streakData] = await Promise.all([
          fetchCurrentPRs(),
          getStreak()
        ]);
        setPrs(prsData);
        setStreak(streakData.days);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header: Bio/Identity (no badges here) */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <img 
            src={userData.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          
          {/* Name and info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-white">{userData.name}</h1>
              <span className="text-zinc-400">• {userData.age}</span>
              <div className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-medium">
                {userData.athleteType}
              </div>
            </div>
            <div className="text-sm text-zinc-400 mt-1">@{userData.handle}</div>
            
            {/* Bio section */}
            <div className="mt-3">
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-zinc-900/50 border-zinc-700 text-white resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="bg-emerald-500 text-black hover:bg-emerald-400"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-zinc-600 text-zinc-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {bio}
                </p>
              )}
            </div>
          </div>
          
          {/* Edit button (only for owner) */}
          {isOwner && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(!isEditing)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* TierScore Badge - Centered, image only */}
      <div className="flex justify-center py-6">
        <TierScoreBadgeView 
          score={67} 
          percentile={25.5} 
          size={96}
        />
      </div>

      {/* Streak (identical to Home) */}
      <StreakCard 
        streak={streak}
        hasLoggedToday={hasLoggedToday}
      />

      {/* Personal Records (cards identical to PR page) */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Personal Records</h2>
          <Button
            size="sm"
            className="bg-emerald-500 text-black hover:bg-emerald-400 text-xs flex items-center gap-1"
            onClick={() => navigate('/prs-main')}
          >
            <Plus className="w-3 h-3" />
            Add PR
          </Button>
        </div>

        {/* PR Cards using the same component as PRs page */}
        <div className="space-y-3">
          {MAIN_LIFTS.map((lift) => {
            const pr = prs[lift];
            if (!pr || pr.valueKg === 0) return null;

            return (
              <PRCard
                key={lift}
                lift={lift}
                valueKg={pr.valueKg}
                updatedAt={pr.updatedAt}
                proofUrl={pr.proofUrl}
                canEdit={isOwner}
                onEdit={() => navigate('/prs-main')}
                onViewProof={pr.proofUrl ? () => setVideoModal({
                  open: true,
                  title: lift,
                  url: pr.proofUrl!
                }) : undefined}
              />
            );
          })}
        </div>

        {/* Empty state */}
        {MAIN_LIFTS.every(lift => !prs[lift] || prs[lift].valueKg === 0) && (
          <div className="text-center py-8">
            <div className="text-zinc-400 mb-4">No PRs yet. Upload your first PR.</div>
            <Button
              className="bg-emerald-500 text-black hover:bg-emerald-400"
              onClick={() => navigate('/prs-main')}
            >
              Upload PR
            </Button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        open={videoModal.open}
        title={videoModal.title}
        videoUrl={videoModal.url}
        onClose={() => setVideoModal({ open: false, title: "", url: "" })}
      />
    </div>
  );
}