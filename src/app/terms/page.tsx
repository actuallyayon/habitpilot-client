import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-black text-foreground mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground">
        <p>Last updated: July 2026</p>
        
        <h2 className="text-2xl font-bold mt-8">1. Acceptance of Terms</h2>
        <p>By accessing and using HabitPilot, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-2xl font-bold mt-8">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on HabitPilot's website for personal, non-commercial transitory viewing only.</p>
        
        <h2 className="text-2xl font-bold mt-8">3. AI Generated Content</h2>
        <p>HabitPilot utilizes Artificial Intelligence to generate recommendations and plans. We do not guarantee the absolute accuracy or safety of these AI-generated suggestions. Always exercise your own judgment, especially regarding physical health routines.</p>
        
        <h2 className="text-2xl font-bold mt-8">4. Limitations</h2>
        <p>In no event shall HabitPilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HabitPilot's website.</p>
        
        <div className="mt-12 pt-8 border-t border-card-border">
          <Link href="/" className="text-primary hover:underline font-medium">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
