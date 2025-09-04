import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import T1LogoHero from "@/components/T1LogoHero";
import { TodayCard } from "@/components/TodayCard";
import { CompactStreakCard } from "@/components/CompactStreakCard";
import { BodyScanCard } from "@/components/BodyScanCard";
import { WeakSpotNudge } from "@/components/WeakSpotNudge";
import { UtilityTiles } from "@/components/UtilityTiles";
import { HomeShareCard } from "@/components/HomeShareCard";
import { shareElement } from "@/hooks/useShare";
import { getStreak, startQuickWorkout, completeQuickWorkout, pingStreak } from "@/lib/api";
import { getLastBodyScan, startBodyScan } from "@/lib/api";

const Home = () => {
  const navigate = useNavigate();
  const shareRef = useRef<HTMLDivElement>(null);
  const [streak, setStreak] = useState<{ days: number; loggedToday: boolean }>({ days: 1000, loggedToday: false });
  const [quickLogLoading, setQuickLogLoading] = useState(false);
  const [scanAvailable, setScanAvailable] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Mock user data - in real app this would come from API/context
  const mockUserData = {
    score: 72,
    percentile: 30, // Not top 1%, so no emerald
    todaysPlan: "Push" as const,
    weakSpot: {
      muscle: "Back",
      deficit: 4,
      exercises: ["Lat pulldown", "Chest-supported row", "Face pulls"]
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const streakData = await getStreak();
        setStreak(streakData);
        
        // Check scan availability
        const { lastScanAt } = await getLastBodyScan();
        const now = Date.now();
        const lastScan = lastScanAt ? new Date(lastScanAt).getTime() : 0;
        const daysSinceLastScan = (now - lastScan) / (1000 * 60 * 60 * 24);
        setScanAvailable(!lastScanAt || daysSinceLastScan >= 7);
      } finally {
        setDataLoading(false);
      }
    })();
  }, []);

  const handleQuickLog = async () => {
    if (quickLogLoading || streak.loggedToday) return;
    
    setQuickLogLoading(true);
    try {
      const { sessionId } = await startQuickWorkout();
      await completeQuickWorkout(sessionId);
      await pingStreak();
      
      const newStreak = { days: streak.days + 1, loggedToday: true };
      setStreak(newStreak);
    } finally {
      setQuickLogLoading(false);
    }
  };

  const handleScanStart = async () => {
    const res = await startBodyScan();
    if (res.started) {
      navigate('/scan');
    }
  };

  const utilityActions = [
    { label: "Muscle Breakdown", sub: "View by muscle group", onClick: () => navigate('/progress-badges?tab=muscles') },
    { label: "Leaderboards", sub: "Global & National", onClick: () => navigate('/leaderboard') },
    { label: "Personal Records", sub: "PRs & activity", onClick: () => navigate('/prs-main') },
    { label: "Scan Share", sub: "Create social image", onClick: async () => {
        if (shareRef.current) await shareElement(shareRef.current, "tierone-progress.png");
      }},
  ];

  return (
    <div className="pb-24 bg-black text-white min-h-screen">
      {/* Compact TierOne logo hero */}
      <div className="h-24">
        <T1LogoHero 
          src="/lovable-uploads/dc0ffd36-4e86-4391-a662-5207dbc88ba2.png" 
          size={120} 
          period={8} 
        />
      </div>

      {/* Today card - the star of the page */}
      <TodayCard
        score={mockUserData.score}
        percentile={mockUserData.percentile}
        todaysPlan={mockUserData.todaysPlan}
        scanAvailable={scanAvailable}
        onScanClick={handleScanStart}
        onQuickLog={handleQuickLog}
        quickLogLoading={quickLogLoading}
        loggedToday={streak.loggedToday}
        loading={dataLoading}
      />

      {/* Compact streak card with countdown */}
      <CompactStreakCard streak={streak.days} />

      {/* Body scan card with deltas */}
      <BodyScanCard onStarted={() => navigate('/scan')} />

      {/* Weak-spot nudge (only show if deficit >= 4) */}
      {mockUserData.weakSpot.deficit >= 4 && (
        <WeakSpotNudge
          muscleGroup={mockUserData.weakSpot.muscle}
          deficit={mockUserData.weakSpot.deficit}
          exercises={mockUserData.weakSpot.exercises}
          onQuickLog={handleQuickLog}
        />
      )}

      {/* Utility tiles (limited to 4) */}
      <UtilityTiles actions={utilityActions} />

      {/* Offscreen share card */}
      <div className="fixed -left-[9999px] top-0">
        <HomeShareCard
          ref={shareRef} variant="story"
          name="Braedon Williams" athlete="Hybrid Athlete"
          score={mockUserData.score} tier="Silver"
          top={[{name:"Shoulders",score:92},{name:"Legs",score:89},{name:"Chest",score:87}]}
        />
      </div>
    </div>
  );
};

export default Home;