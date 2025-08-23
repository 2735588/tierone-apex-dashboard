import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGender } from "@/contexts/GenderContext";
import { startScan, completeScan, fetchScore } from "@/services";
import { PhotoConsentModal } from "@/components/PhotoConsentModal";
import bodyImage from "@/assets/body-silhouette.png";

export const Scan = () => {
  const navigate = useNavigate();
  const { gender } = useGender();
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('t1_consent');
    setHasConsent(consent === 'true');
  }, []);

  // Mock data - in real app this would come from user context/API
  const daysSinceLastScan = 3;
  const lastTierScore = 645;
  const nationalRank = 2314;
  const scansCompleted = 2;
  const nextMilestone = 3;
  const milestoneProgress = (scansCompleted / nextMilestone) * 100;

  const handleStartScan = () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }
    // Navigate to AI scan page
    navigate('/ai-scan');
  };

  async function runTestScan() {
    const { scanId } = await startScan();
    setIsProcessing(true);
    await completeScan(scanId);
    const timer = setInterval(async () => {
      const s = await fetchScore(scanId);
      if (s) {
        setScore(s);
        setIsProcessing(false);
        clearInterval(timer);
      }
    }, 400);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Status bar simulation */}
      <div className="h-6 bg-background" />
      
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center tier-glow">
              <span className="text-sm font-bold text-primary-foreground">T1</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Body Scan</h1>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-8 space-y-8">
        
        {/* 3D Body Preview */}
        <div className="relative">
          <div className="scan-grid-bg absolute inset-0 rounded-full opacity-20" />
          <div className="relative w-48 h-64 flex items-center justify-center">
            <img 
              src={bodyImage} 
              alt="Body Silhouette" 
              className="w-full h-full object-contain body-scan-pulse filter brightness-110"
            />
            {/* Scanning effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent scan-line opacity-60" />
          </div>
          
          {/* Progress ring around body */}
          <div className="absolute inset-0 rounded-full border-2 border-accent/30 tier-glow animate-pulse" />
        </div>

        {/* Scan Stats */}
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-xl p-4">
            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">Current Tier Score</div>
              <div className="text-3xl font-bold text-accent tier-glow">{lastTierScore}</div>
              <div className="text-xs text-muted-foreground">Ranked #{nationalRank} NZ</div>
            </div>
          </div>

          {/* Days Since Last Scan */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">Last Scan</div>
                <div className="text-xs text-muted-foreground">{daysSinceLastScan} days ago</div>
              </div>
              <Zap className="w-5 h-5 text-accent energy-pulse" />
            </div>
            <div className="mt-2 text-xs text-accent font-medium">
              Ready for your next breakthrough? 💪
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground">Scan Progress</div>
                <div className="text-xs text-muted-foreground">{scansCompleted}/{nextMilestone}</div>
              </div>
              <Progress value={milestoneProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Next tier update unlocks at your {nextMilestone}rd scan
              </div>
            </div>
          </div>
        </div>

        {/* Start Scan Button */}
        <div className="w-full max-w-sm pt-4">
          <Button
            onClick={handleStartScan}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              w-full h-16 bg-gradient-primary text-primary-foreground 
              font-bold text-lg rounded-2xl tier-glow
              transition-all duration-300 hover:scale-105 hover:brightness-110
              ${isHovered ? 'scan-ripple' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <span>START SCAN</span>
              <Target className="w-5 h-5 energy-pulse" />
            </div>
          </Button>
          
          <div className="text-center text-xs text-muted-foreground mt-3">
            Position yourself in good lighting for best results
          </div>

          {/* Test Mock Backend */}
          <button onClick={runTestScan} className="mt-4 px-4 py-2 rounded-lg border w-full">
            Test Scan (mock)
          </button>
          {isProcessing && <p className="mt-2 text-center">Processing…</p>}
          {score && (
            <div className="mt-3 text-center">
              <div>Score: <b>{score.overall_score}</b></div>
              <div>Tier: <b>{score.tier}</b></div>
            </div>
          )}
        </div>
      </div>

      <PhotoConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConsent={() => {
          setHasConsent(true);
          navigate('/ai-scan');
        }}
      />
    </div>
  );
};