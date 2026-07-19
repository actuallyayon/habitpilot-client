import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-black text-foreground mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground">
        <p>Last updated: July 2026</p>
        
        <h2 className="text-2xl font-bold mt-8">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create or modify your account, use our AI generation features, and contact us.</p>
        
        <h2 className="text-2xl font-bold mt-8">2. How We Use Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, including feeding anonymized data into our AI models to improve habit recommendation accuracy.</p>
        
        <h2 className="text-2xl font-bold mt-8">3. Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy (e.g., payment processing via Stripe, or authentication via Google).</p>
        
        <h2 className="text-2xl font-bold mt-8">4. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        
        <div className="mt-12 pt-8 border-t border-card-border">
          <Link href="/" className="text-primary hover:underline font-medium">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
