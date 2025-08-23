const Privacy = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Photo Privacy</h2>
            <p>
              Your photos are processed locally and securely to generate your TierScore. 
              We use industry-standard encryption and do not share your images with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Collection</h2>
            <p>
              We collect minimal data necessary to provide our service: scan results, 
              progress tracking, and anonymous usage analytics to improve the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Deletion</h2>
            <p>
              You can delete your photos and data at any time through your profile settings. 
              Once deleted, your data cannot be recovered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
            <p>
              For privacy questions, contact us at privacy@tierone.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;