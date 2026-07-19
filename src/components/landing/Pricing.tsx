import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { CheckIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, transparent pricing.</h2>
          <p className="text-neutral text-lg">Start for free, upgrade when you need to run multiple parallel habits.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 border-card-border bg-card-bg shadow-sm flex flex-col">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-foreground">Free</CardTitle>
              <div className="text-4xl font-extrabold mt-4 mb-2 text-foreground">$0<span className="text-lg text-neutral font-normal">/mo</span></div>
              <p className="text-sm text-neutral">Perfect for building your core routine.</p>
            </CardHeader>
            <CardContent className="px-0 flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1 mt-4">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">1 Active Habit Plan (up to 5 habits)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Daily Agent Coaching</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Weekly Adaptive Replanning</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Basic Streak Tracking</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/register">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 border-primary bg-primary/5 dark:bg-primary/10 shadow-xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Popular
            </div>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-primary">Pro</CardTitle>
              <div className="text-4xl font-extrabold mt-4 mb-2 text-foreground">$9<span className="text-lg text-neutral font-normal">/mo</span></div>
              <p className="text-sm text-neutral">For total life optimization.</p>
            </CardHeader>
            <CardContent className="px-0 flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1 mt-4">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-semibold">Unlimited Active Habit Plans</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Monthly Narrative Insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Advanced Pattern Detection</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Priority Agent Processing</span>
                </li>
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href="/register">Upgrade to Pro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
