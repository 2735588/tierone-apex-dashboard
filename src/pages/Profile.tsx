import React, { useEffect, useState } from 'react';
import { TierScoreBadgeView } from '@/components/TierScoreBadgeView';
import { fetchCurrentPRs, getStreak } from '@/lib/api';
import { PRRecord } from '@/lib/api';
import { MAIN_LIFTS } from '@/lib/pr';

export default function Profile() {
  const [prs, setPrs] = useState<Record<string, PRRecord>>({});
  const [streak, setStreak] = useState(12);

  // Mock data - replace with actual user data
  const userData = {
    name: "Alex Morgan",
    age: 28,
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

  // Convert kg to display format (using kg for now)
  const formatWeight = (kg: number) => `${kg} kg`;

  return (
    <div className="min-h-screen bg-black text-white pb-24 px-6 pt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
          <span className="text-lg text-zinc-400">· {userData.age}</span>
        </div>
        <div className="text-emerald-400 font-medium">{userData.athleteType}</div>
      </div>

      {/* TierScore Badge - Centerpiece */}
      <div className="flex justify-center mb-8">
        <TierScoreBadgeView 
          score={67} 
          percentile={25.5} 
          size={120}
        />
      </div>

      {/* Current Streak */}
      <div className="text-center mb-8">
        <div className="text-xl text-white font-bold">
          🔥 {streak} Days
        </div>
      </div>

      {/* Personal Records */}
      <div className="max-w-sm mx-auto">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">Personal Records</h2>
        
        <div className="space-y-3">
          {MAIN_LIFTS.map((lift) => {
            const pr = prs[lift];
            if (!pr || pr.valueKg === 0) return null;

            // Format lift name for display
            const displayName = lift === 'Back Squat' ? 'Back Squat' :
                              lift === 'Bench Press' ? 'Bench Press' :
                              lift === 'Deadlift' ? 'Deadlift' :
                              lift === 'Overhead Press' ? 'Overhead Press' :
                              lift;

            return (
              <div key={lift} className="flex justify-between items-center">
                <span className="text-white">{displayName}</span>
                <span className="text-emerald-400 font-bold">{formatWeight(pr.valueKg)}</span>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {MAIN_LIFTS.every(lift => !prs[lift] || prs[lift].valueKg === 0) && (
          <div className="text-center text-zinc-400">
            No PRs recorded yet
          </div>
        )}
      </div>
    </div>
  );
}