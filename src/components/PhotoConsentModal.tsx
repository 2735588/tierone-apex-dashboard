import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface PhotoConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsent: () => void;
}

export const PhotoConsentModal = ({ isOpen, onClose, onConsent }: PhotoConsentModalProps) => {
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('t1_consent');
    if (consent === 'true') {
      setHasConsented(true);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem('t1_consent', 'true');
    setHasConsented(true);
    onConsent();
    onClose();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setHasConsented(checked);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Photo & Data Consent</DialogTitle>
          <DialogDescription className="space-y-4">
            <p>
              Your photos are private and only used to compute your scores. You can delete them anytime.
            </p>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="consent" 
                checked={hasConsented}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree
              </label>
            </div>

            <div className="text-xs text-muted-foreground space-x-4">
              <Link to="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConsent} 
            disabled={!hasConsented}
            className="bg-gradient-primary"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};