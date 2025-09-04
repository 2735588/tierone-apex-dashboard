import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import T1LogoHero from "@/components/T1LogoHero";
import { QuickActions } from "@/components/QuickActions";
import { WorkoutLogCard } from "@/components/WorkoutLogCard";
import { ThisWeekCard } from "@/components/ThisWeekCard";
import { RecentPRStrip } from "@/components/RecentPRStrip";
import { getLastBodyScan } from "@/lib/api";
import { fmtDateShort } from "@/lib/cooldown";

const Home = () => {
  const navigate = useNavigate();
  const [lastScanDate, setLastScanDate] = useState<string>();
  const [dataLoading, setDataLoading] = useState(true);

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
      <WorkoutLogCard />

      {/* This Week Card */}
      <ThisWeekCard />

      {/* Recent PRs Strip */}
      <RecentPRStrip onAdd={handlePRsNavigation} />
    </div>
  );
};

export default Home;