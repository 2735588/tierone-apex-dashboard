import { Camera, Zap, Clock, Crown, CheckCircle, AlertCircle, Share, RotateCcw, Smartphone, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AIScan = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [scanMode, setScanMode] = useState<'free' | 'premium' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [currentPose, setCurrentPose] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const poses = [
    "Face Forward, Arms Slightly Out",
    "Left Side View", 
    "Right Side View",
    "Back View",
    "Arms Raised Front",
    "Arms Flexed Front", 
    "Arms Flexed Side",
    "Arms Down Relaxed",
    "Slight Squat Pose",
    "Neutral Stance"
  ];

  const steps = [
    { number: 1, title: "Choose Scan Mode", icon: Crown },
    { number: 2, title: "Setup Instructions", icon: AlertCircle },
    { number: 3, title: "Live Scan", icon: Camera },
    { number: 4, title: "Processing", icon: Clock },
    { number: 5, title: "Results", icon: CheckCircle },
  ];

  const handleScanStart = (mode: 'free' | 'premium') => {
    setScanMode(mode);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      if (currentStep === 3) {
        startScan();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const startScan = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      setIsScanning(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      // Start pose sequence
      startPoseSequence();
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions and try again.');
    }
  };

  const startPoseSequence = () => {
    setCurrentPose(0);
    startCountdown();
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          captureCurrentPose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const captureCurrentPose = () => {
    // Simulate capturing pose
    setTimeout(() => {
      setCurrentPose(prevPose => {
        const nextPose = prevPose + 1;
        console.log(`Current pose: ${prevPose}, Next pose: ${nextPose}, Total poses: ${poses.length}`);
        
        if (nextPose >= poses.length) {
          console.log('Completing scan - reached final pose');
          completeScan();
          return prevPose; // Don't increment past the last pose
        } else {
          console.log('Moving to next pose');
          // Start countdown for next pose
          setTimeout(() => startCountdown(), 100);
          return nextPose;
        }
      });
    }, 500);
  };

  const completeScan = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
    setIsProcessing(true);
    setCurrentStep(4);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(5);
    }, 3000);
  };

  const handleViewResults = () => {
    // Navigate to progress page
    navigate('/progress-badges');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Zap className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">AI Body Scan</h2>
              <p className="text-muted-foreground">Choose your scan mode to analyze your physique</p>
            </div>

            {/* Free Mode */}
            <div className="tier-card rounded-xl p-6 border border-muted">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Free Scan</h3>
                <div className="text-sm text-muted-foreground">1 per week</div>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Basic TierScore calculation</li>
                <li>• Muscle group ratings</li>
                <li>• National leaderboard position</li>
                <li>• Progress tracking</li>
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleScanStart('free')}
              >
                Start Free Scan
              </Button>
            </div>

            {/* Premium Mode */}
            <div className="tier-card rounded-xl p-6 border border-accent/30 tier-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">Premium Scan</h3>
                  <Crown className="w-5 h-5 text-tier-gold" />
                </div>
                <div className="text-sm text-tier-gold">Unlimited</div>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Everything in Free</li>
                <li>• Global leaderboard access</li>
                <li>• Detailed muscle improvement AI coach</li>
                <li>• Weekly scan comparison slider</li>
                <li>• Advanced analytics & recommendations</li>
                <li>• Shareable progress visuals</li>
              </ul>
              
              <Button 
                variant="tier" 
                className="w-full"
                onClick={() => handleScanStart('premium')}
              >
                Upgrade & Scan
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Smartphone className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">📸 TierOne Scan Instructions</h2>
              <p className="text-muted-foreground">Follow these steps for accurate results</p>
            </div>

            <div className="space-y-4">
              {/* Setup Environment */}
              <div className="tier-card rounded-xl p-4">
                <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">✅</div>
                  Setup Your Environment
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-8">
                  <p><strong>Lighting:</strong> Use bright, even lighting. Avoid shadows or strong backlight.</p>
                  <p><strong>Background:</strong> Stand in front of a plain wall or uncluttered background.</p>
                  <p><strong>Camera Position:</strong> Place your phone upright on a stable surface, at chest height.</p>
                </div>
              </div>

              {/* Body Positioning */}
              <div className="tier-card rounded-xl p-4">
                <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">👤</div>
                  Positioning Your Body
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-8">
                  <p><strong>Distance:</strong> Stand 2–3 meters (6–10 feet) away from your phone.</p>
                  <p><strong>Framing:</strong> Make sure your entire body (head to feet) is visible.</p>
                  <p><strong>Clothing:</strong> Wear tight-fitting gym wear so your physique can be analyzed properly.</p>
                  <p><strong>Shoes:</strong> Remove bulky shoes if possible — barefoot or socks preferred.</p>
                </div>
              </div>

              {/* Pose Sequence */}
              <div className="tier-card rounded-xl p-4">
                <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">🧍</div>
                  Pose Sequence
                </h4>
                <div className="text-sm text-muted-foreground ml-8 mb-3">
                  <p>The app will guide you through 10 poses automatically with a 3-second countdown.</p>
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground ml-8">
                  {poses.map((pose, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-muted rounded-full flex items-center justify-center text-xs">{index + 1}</span>
                      <span>{pose}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Estimate */}
              <div className="tier-card rounded-xl p-4 bg-accent/5 border border-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">Estimated Time: ~1 Minute</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  💡 <strong>Pro Tip:</strong> Stay relaxed and stand naturally — the AI detects real muscle shape.
                </p>
              </div>
            </div>

            <Button variant="tier" className="w-full" onClick={handleNext}>
              Start Live Scan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Camera className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Live Scan</h2>
              <p className="text-muted-foreground">Follow the pose instructions on screen</p>
            </div>

            {isScanning ? (
              <div className="space-y-4">
                {/* Camera View */}
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-80 object-cover rounded-xl bg-black"
                  />
                  
                  {/* Pose Overlay */}
                  <div className="absolute top-4 left-4 right-4 bg-black/70 rounded-lg p-3 text-center">
                    <div className="text-white font-semibold">
                      Pose {currentPose + 1}/10: {poses[currentPose]}
                    </div>
                    {countdown > 0 && (
                      <div className="text-3xl font-bold text-accent mt-2">
                        {countdown}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm mb-2">
                      <span>Scan Progress</span>
                      <span>{currentPose + 1}/10</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-accent h-full rounded-full transition-all duration-300" 
                        style={{ width: `${((currentPose + 1) / 10) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tier-card rounded-xl p-8 text-center border-2 border-dashed border-accent/30">
                <Camera className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Ready to start your scan?</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Make sure you're positioned correctly and have good lighting
                </p>
                <Button variant="tier" className="w-full" onClick={handleNext}>
                  Begin Scan Sequence
                </Button>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="relative">
                <Clock className="w-16 h-16 text-accent mx-auto mb-4 energy-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Processing Scan</h2>
              <p className="text-muted-foreground">AI is analyzing your physique...</p>
            </div>

            <div className="tier-card rounded-xl p-6 text-center">
              <div className="space-y-4">
                <div className="text-lg font-semibold text-accent">Calibrating AI scan...</div>
                
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-primary h-full rounded-full performance-bar animate-pulse" style={{ width: '65%' }} />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Analyzing muscle definition and body composition
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Photos processed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Muscle groups identified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Calculating TierScore...</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-tier-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Scan Complete!</h2>
              <p className="text-muted-foreground">Your new physique analysis is ready</p>
            </div>

            <div className="tier-card rounded-xl p-6 text-center tier-glow">
              <div className="text-4xl font-bold text-accent mb-2">2,863</div>
              <div className="text-sm text-muted-foreground mb-4">New TierScore (+16)</div>
              <div className="text-tier-gold font-semibold">🔥 Personal Best!</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="tier-card rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-tier-gold">Chest +3</div>
                <div className="text-xs text-muted-foreground">Biggest Improvement</div>
              </div>
              <div className="tier-card rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-accent">Core 68</div>
                <div className="text-xs text-muted-foreground">Focus Area</div>
              </div>
            </div>

            {scanMode === 'premium' && (
              <div className="tier-card rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2">AI Coach Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on core development. Your chest has improved significantly - maintain current routine. 
                  Consider adding more unilateral leg work to balance development.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button variant="tier" className="w-full" onClick={handleViewResults}>
                View Full Results
              </Button>
              <Button variant="outline" className="w-full">
                <Share className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${currentStep >= step.number ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
            `}>
              {currentStep > step.number ? <CheckCircle className="w-4 h-4" /> : step.number}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${currentStep > step.number ? 'bg-accent' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
};

export default AIScan;