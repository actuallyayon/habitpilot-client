export function FAQ() {
  const faqs = [
    {
      q: "How is this different from other habit trackers?",
      a: "Most trackers just give you a streak counter and make you feel bad when you break it. HabitPilot uses AI to analyze why you broke the streak and actively suggests changes to your routine so you don't fail again."
    },
    {
      q: "Do I have to chat with a bot every day?",
      a: "No! You just check off your habits and optionally leave a quick note (like 'felt tired'). The agent reads it and gives you a single, contextual reaction. No back-and-forth required."
    },
    {
      q: "Can I use HabitPilot for free?",
      a: "Yes! The free tier includes 1 active Habit Plan (which can hold up to 5 habits) and full access to the Daily and Weekly agents. You only need Pro if you want to run multiple plans simultaneously or get Monthly Insight reports."
    },
    {
      q: "What happens if I skip a habit for a whole week?",
      a: "The Weekly Agent will notice the friction. Instead of letting you abandon the goal, it will propose shrinking the scope (e.g., from 'Run 30 mins' to 'Put on running shoes and walk 5 mins') until you build the consistency."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-sm">
              <h4 className="text-lg font-bold text-foreground mb-2">{faq.q}</h4>
              <p className="text-neutral leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
