import { Card, CardContent } from '../ui/Card';

export function Testimonials() {
  const testimonials = [
    {
      quote: "I've tried a dozen habit trackers. This is the first one that didn't make me feel guilty when I failed. The Weekly Agent realized I was too tired to work out after my shift and suggested morning mini-workouts instead. It completely changed my routine.",
      name: "Sarah J.",
      role: "Nurse"
    },
    {
      quote: "The monthly pattern insights are insane. It pointed out that I only successfully read my book on days I also logged 8 hours of sleep. Connecting those dots made me prioritize sleep to hit my reading goals.",
      name: "Mark D.",
      role: "Software Engineer"
    },
    {
      quote: "It actually feels like a coach. When I wrote 'too stressed' in my check-in, the agent didn't give me a generic 'Keep going!'. It told me to take a breath and suggested a 2-minute meditation for tomorrow. Unreal.",
      name: "Elena R.",
      role: "Founder"
    }
  ];

  return (
    <section className="py-24 bg-neutral-light/20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">Don't take our word for it.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 bg-white border-card-border shadow-sm">
              <CardContent className="p-0 flex flex-col h-full justify-between">
                <p className="text-foreground leading-relaxed italic mb-6">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-primary-dark">{t.name}</div>
                  <div className="text-sm text-neutral">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
