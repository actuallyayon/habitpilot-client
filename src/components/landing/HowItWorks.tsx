import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Onboarding Analysis',
      desc: 'Tell us your goals, obstacles, and available time. Our Plan Agent crafts a personalized "habit stack" with concrete triggers and minimum viable versions.',
      color: 'bg-primary'
    },
    {
      step: '02',
      title: 'Daily Check-in',
      desc: 'Log what you did (or didn\'t do) along with a short note. Our Daily Agent responds with specific, contextual coaching based on your actual day.',
      color: 'bg-secondary'
    },
    {
      step: '03',
      title: 'Weekly Replanning',
      desc: 'Habits aren\'t static. If you keep skipping a habit, our Adaptive Agent analyzes the friction and proposes concrete adjustments to your plan for the next week.',
      color: 'bg-primary-dark'
    },
    {
      step: '04',
      title: 'Monthly Insights',
      desc: 'Get a comprehensive narrative report of your best habits, biggest struggles, and hidden patterns (e.g. morning vs evening success rates).',
      color: 'bg-tertiary'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The 4-Stage Agent Pipeline</h2>
          <p className="text-neutral text-lg">HabitPilot isn't just a tracker. It's a system that actively works with you to guarantee long-term success.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <Card key={i} className="relative overflow-hidden border-none shadow-lg bg-card-bg group hover:-translate-y-2 transition-transform duration-300">
              <div className={`h-2 w-full ${s.color}`} />
              <CardHeader>
                <div className="text-5xl font-extrabold text-neutral-light mb-4">{s.step}</div>
                <CardTitle className="text-xl text-primary-dark">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80 leading-relaxed">
                  {s.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
