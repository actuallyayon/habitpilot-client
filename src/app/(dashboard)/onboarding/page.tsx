'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function OnboardingPage() {
  const [goals, setGoals] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [minutes, setMinutes] = useState('30');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for now
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Let's build your habit stack</h1>
        <p className="text-neutral">Our AI Plan Agent will analyze your constraints and generate an adaptable routine.</p>
      </div>

      <Card className="border-card-border shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">What are your top 2-3 goals?</label>
              <textarea 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Read more books, run a 5k, meditate daily."
                className="w-full p-3 border border-card-border rounded-lg focus:ring-2 focus:ring-primary min-h-[100px]"
                required
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">What usually stops you from sticking to habits?</label>
              <textarea 
                value={obstacles}
                onChange={(e) => setObstacles(e.target.value)}
                placeholder="e.g. Too tired after work, no consistent morning schedule."
                className="w-full p-3 border border-card-border rounded-lg focus:ring-2 focus:ring-primary min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">How many minutes per day can you realistically dedicate to this?</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full accent-primary"
                />
                <span className="font-bold text-primary-dark w-16 text-right">{minutes} min</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-neutral-light/30 border-t border-card-border p-6">
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Agent is generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-secondary-light" />
                  Generate My Plan
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
