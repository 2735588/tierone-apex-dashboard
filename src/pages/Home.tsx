import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import T1LogoHero from "@/components/T1LogoHero";
import { QuickActions } from "@/components/QuickActions";
import { WorkoutLogCard } from "@/components/WorkoutLogCard";
import { ThisWeekCard } from "@/components/ThisWeekCard";
import { StreakCard } from "@/components/StreakCard";
import { RecentPRStrip } from "@/components/RecentPRStrip";
import { getLastBodyScan } from "@/lib/api";
import { fmtDateShort } from "@/lib/cooldown";

const Home = () => {
  const navigate = useNavigate();
  const [lastScanDate, setLastScanDate] = useState<string>();
  const [dataLoading, setDataLoading] = useState(true);
  const [streak] = useState(12); // TODO: Connect to actual streak data
  const [hasLoggedToday] = useState(false); // TODO: Connect to actual logging state

  useEffect(() => {
    (async () => {
      try {
        const { lastScanAt } = await getLastBodyScan();
        if (lastScanAt) {
          setLastScanDate(fmtDateShort(lastScanAt));
        }
      } finally {
        setDataLoading(false);
      }
    })();
  }, []);

  const handlePRsNavigation = () => {
    navigate('/prs-main');
  };

  const handleStreakLogToday = () => {
    // TODO: Add analytics tracking
    // For now, just scroll to workout log card or open quick log
    const workoutCard = document.querySelector('[data-workout-log-card]');
    if (workoutCard) {
      workoutCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStreakBodyScan = () => {
    // TODO: Add analytics tracking
    navigate('/scan');
  };

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

      {/* Quick Actions */}
      <QuickActions lastScanDate={lastScanDate} />

      {/* Workout Log Card */}
      <div data-workout-log-card>
        <WorkoutLogCard />
      </div>

      {/* This Week Card */}
      <ThisWeekCard />

      {/* Streak Card */}
      <StreakCard 
        streak={streak}
        hasLoggedToday={hasLoggedToday}
      />

      {/* Recent PRs Strip */}
      <RecentPRStrip onAdd={handlePRsNavigation} />
    </div>
  );
};

export default Home;