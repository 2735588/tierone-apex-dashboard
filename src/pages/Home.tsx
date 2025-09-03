import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { HomeHeader } from "@/components/HomeHeader";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { QuickStats } from "@/components/QuickStats";
import { QuickActions } from "@/components/QuickActions";
import { FriendsStreaks } from "@/components/FriendsStreaks";
import { HomeShareCard } from "@/components/HomeShareCard";
import { shareElement } from "@/hooks/useShare";

const Home = () => {
  const navigate = useNavigate();
  const shareRef = useRef<HTMLDivElement>(null);

  const actions = [
    { label: "Scan Share", sub: "Create social image", onClick: async () => {
        if (shareRef.current) await shareElement(shareRef.current, "tierone-progress.png");
      }},
    { label: "Muscle Breakdown", sub: "View by muscle group", onClick: () => navigate('/progress-badges?tab=muscles') },
    { label: "Leaderboards", sub: "Global & National", onClick: () => navigate('/leaderboard') },
    { label: "Log Workout", sub: "PRs & activity", onClick: () => {/* route to workout logging */} },
  ];

  return (
    <div className="pb-24 bg-black text-white min-h-screen">
      <HomeHeader name="Braedon Williams" />

      <PrimaryCTA onScan={() => navigate('/scan')} />

      <QuickStats score={98} tier="Diamond" streak={7} />

      <QuickActions actions={actions} />

      <FriendsStreaks />

      {/* Offscreen share card */}
      <div className="fixed -left-[9999px] top-0">
        <HomeShareCard
          ref={shareRef} variant="story"
          name="Braedon Williams" athlete="Hybrid Athlete"
          score={98} tier="Diamond"
          top={[{name:"Shoulders",score:92},{name:"Legs",score:89},{name:"Chest",score:87}]}
        />
      </div>
    </div>
  );
};

export default Home;