const Terms = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Service Usage</h2>
            <p>
              TierOne provides body composition analysis through AI-powered photo scanning. 
              By using our service, you agree to provide accurate information and use the app responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide consent for photo processing</li>
              <li>Use the app for personal fitness tracking only</li>
              <li>Not share your account with others</li>
              <li>Report any technical issues or concerns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Disclaimers</h2>
            <p>
              TierOne scores are estimates for fitness tracking purposes. 
              Always consult healthcare professionals for medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Updates</h2>
            <p>
              We may update these terms as our service evolves. 
              Continued use constitutes acceptance of updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;