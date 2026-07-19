import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl min-h-screen">
      <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 text-center">About HabitPilot</h1>
      <Card className="bg-card-bg border-card-border shadow-sm p-8">
        <CardContent className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-foreground">
            HabitPilot is an AI-powered habit tracking platform designed to help you build, maintain, and optimize your daily routines. 
            We believe that consistency is the key to success, but knowing exactly *what* to do and *when* to adjust is the hardest part.
          </p>
          <p className="text-lg text-foreground">
            That's where HabitPilot comes in. Our intelligent agents work alongside you to analyze your progress, suggest dynamic adjustments, 
            and keep you accountable through tailored recommendations. Whether you're trying to read more, stay fit, or master a new skill, 
            our goal is to make sure your habits stick.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8">Our Mission</h2>
          <p className="text-lg text-foreground">
            To provide the most adaptive and personalized self-improvement tool on the internet, transforming the way people achieve their long-term goals.
          </p>
          <div className="mt-8 pt-8 border-t border-card-border">
            <Link href="/" className="text-primary hover:underline font-medium">← Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
