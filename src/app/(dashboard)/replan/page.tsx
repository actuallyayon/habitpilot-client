'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function ReplanPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-primary" />
          Weekly Replan Proposal
        </h1>
        <p className="text-neutral">Your agent has analyzed last week's performance and proposes the following adjustments to guarantee success next week.</p>
      </div>

      <Card className="border-card-border shadow-md overflow-hidden">
        <div className="bg-primary/5 p-6 border-b border-card-border">
          <h3 className="font-bold text-primary-dark mb-2 text-sm uppercase tracking-wider">Agent Reasoning</h3>
          <p className="text-foreground leading-relaxed">
            "You crushed your morning jogs (6/7 days) but struggled heavily with 'Read 10 pages' (only 1/7 days). Your notes consistently mentioned being 'too tired' in the evenings. Instead of dropping reading, I propose we swap the trigger to the morning commute and shrink the scope slightly to build the habit."
          </p>
        </div>
        
        <CardContent className="p-0">
          <div className="divide-y divide-card-border">
            {/* Kept Habit */}
            <div className="p-6 flex items-start gap-4">
              <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground text-lg mb-1">Morning Jog (15m)</h4>
                <div className="inline-block px-2 py-1 bg-neutral-light rounded text-xs font-medium text-neutral mb-2 uppercase">Action: Keep</div>
                <p className="text-sm text-neutral">You're doing great here. No changes needed.</p>
              </div>
            </div>

            {/* Adjusted Habit */}
            <div className="p-6 flex items-start gap-4 bg-orange-50/30">
              <ExclamationCircleIcon className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="w-full">
                <h4 className="font-semibold text-foreground text-lg mb-1">Read 10 pages</h4>
                <div className="inline-block px-2 py-1 bg-orange-100 rounded text-xs font-medium text-orange-800 mb-3 uppercase">Action: Swap Trigger & Shrink Scope</div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white border border-card-border opacity-60">
                    <div className="text-xs font-bold text-neutral uppercase mb-2">Old Version</div>
                    <div className="text-sm text-foreground mb-1"><span className="font-semibold text-neutral">Trigger:</span> Before bed</div>
                    <div className="text-sm text-foreground"><span className="font-semibold text-neutral">Scope:</span> 10 pages</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-orange-200 shadow-sm relative">
                    <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-[10px]">!</div>
                    <div className="text-xs font-bold text-orange-700 uppercase mb-2">Proposed Version</div>
                    <div className="text-sm text-foreground mb-1"><span className="font-semibold">Trigger:</span> During commute</div>
                    <div className="text-sm text-foreground"><span className="font-semibold">Scope:</span> 5 pages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-neutral-light/30 border-t border-card-border p-6 flex justify-end gap-4">
          <Button variant="outline" onClick={() => window.location.href='/dashboard'}>Keep Old Plan</Button>
          <Button size="lg" onClick={() => window.location.href='/dashboard'}>Accept Proposal</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
