import { CheckCircleIcon } from '@heroicons/react/24/outline';

export function Features() {
  const features = [
    {
      title: 'Personalized Habit Stacking',
      desc: 'No more generic routines. The AI learns your schedule and ties new habits to existing triggers (like "after your morning coffee").'
    },
    {
      title: 'Adaptive Weekly Replanning',
      desc: 'Life changes. If a habit isn\'t working out, the AI won\'t let you fail. It adapts the habit\'s scope or trigger for the next week.'
    },
    {
      title: 'Contextual Daily Coaching',
      desc: 'When you check in, the AI reads your notes. Feeling tired? It encourages rest. Crushing it? It might challenge you.'
    },
    {
      title: 'Monthly Pattern Insights',
      desc: 'We analyze your 30-day data to find correlations you might miss, like "You succeed at meditation 80% more often before 9 AM".'
    }
  ];

  return (
    <section className="py-24 bg-neutral-light/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Built to adapt to your messy, real life.</h2>
            <p className="text-lg text-neutral mb-8 leading-relaxed">
              Most habit trackers fail because they demand perfection. HabitPilot is built on the philosophy of adaptation. 
              By leveraging agentic AI, it replans your routine weekly based on what you actually accomplished, ensuring you never fall off the wagon completely.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{f.title}</h4>
                    <p className="text-sm text-neutral">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-card-border p-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <h3 className="text-lg font-bold text-primary-dark mb-4">Weekly Replan Proposal</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                  <p className="text-sm text-red-800 font-medium mb-1">Issue Detected</p>
                  <p className="text-sm text-red-600">You skipped "Read 20 pages" 4 times this week in the evening.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <p className="text-sm text-green-800 font-medium mb-1">AI Adjustment</p>
                  <p className="text-sm text-green-700">Let's swap the trigger to "During morning commute" and shrink the scope to "Read 10 pages".</p>
                </div>
                <button className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary-dark transition-colors">
                  Approve New Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
