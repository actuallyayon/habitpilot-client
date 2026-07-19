'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion, Variants } from 'framer-motion';

const features = [
  {
    title: 'Personalized Habit Stacking',
    description: 'No more generic routines. The AI learns your schedule and ties new habits to existing triggers (like "after your morning coffee").'
  },
  {
    title: 'Adaptive Weekly Replanning',
    description: 'Life changes. If a habit isn\'t working out, the AI won\'t let you fail. It adapts the habit\'s scope or trigger for the next week.'
  },
  {
    title: 'Contextual Daily Coaching',
    description: 'When you check in, the AI reads your notes. Feeling tired? It encourages rest. Crushing it? It might challenge you.'
  },
  {
    title: 'Monthly Pattern Insights',
    description: 'We analyze your 30-day data to find correlations you might miss, like "You succeed at meditation 80% more often before 9 AM".'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

export function Features() {
  return (
    <section className="py-24 bg-card-bg/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />
      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            Built to adapt to your messy, real life.
          </h2>
          <p className="text-xl text-neutral mb-8 leading-relaxed font-medium">
            Most habit trackers fail because they demand perfection. HabitPilot is built on the philosophy of adaptation. By leveraging agentic AI, it replans your routine weekly based on what you actually accomplished, ensuring you never fall off the wagon completely.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-background/50 border-card-border hover:border-primary/50 hover:bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
                <CardHeader className="pb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                    <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral font-medium leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
