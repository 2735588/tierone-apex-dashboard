import { Camera, Upload, Zap, Clock, Crown, CheckCircle, AlertCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AIScan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [scanMode, setScanMode] = useState<'free' | 'premium' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { number: 1, title: "Choose Scan Mode", icon: Crown },
    { number: 2, title: "Instructions", icon: AlertCircle },
    { number: 3, title: "Upload Photos", icon: Upload },
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
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(5);
        }, 3000);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
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
              <AlertCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Scan Instructions</h2>
              <p className="text-muted-foreground">Follow these steps for the best results</p>
            </div>

            <div className="space-y-4">
              <div className="tier-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Positioning</h4>
                    <p className="text-sm text-muted-foreground">Stand 2 meters back from camera with good lighting</p>
                  </div>
                </div>
              </div>

              <div className="tier-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Pose</h4>
                    <p className="text-sm text-muted-foreground">Flex and hold pose for clear muscle definition</p>
                  </div>
                </div>
              </div>

              <div className="tier-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Angles</h4>
                    <p className="text-sm text-muted-foreground">Take 10 photos: front, back, sides (slow 360° turn)</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="tier" className="w-full" onClick={handleNext}>
              I'm Ready - Start Scan
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Upload className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Upload Photos</h2>
              <p className="text-muted-foreground">Take 10 photos or record a 360° video</p>
            </div>

            <div className="tier-card rounded-xl p-8 text-center border-2 border-dashed border-muted">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Tap to take photos or upload from gallery</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photos
                </Button>
                <Button variant="outline" className="h-12">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>

            <div className="tier-card rounded-xl p-4">
              <div className="text-sm text-muted-foreground text-center">
                <p>Photos: 0/10 uploaded</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-accent h-full rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            </div>

            <Button variant="tier" className="w-full" onClick={handleNext} disabled>
              Process Scan
            </Button>
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
              <Button variant="tier" className="w-full">
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