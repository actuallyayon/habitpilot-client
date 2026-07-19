'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Brain, Zap, LineChart } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const steps = [
  {
    title: '1. Describe Your Life',
    description: 'Tell the AI what you want to achieve, how much time you have, and why you failed in the past.',
    icon: Brain,
    color: 'text-primary'
  },
  {
    title: '2. Get an Adaptive Plan',
    description: 'HabitPilot generates a realistic habit stack with minimum viable versions and smart triggers.',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    title: '3. Check-in & Evolve',
    description: 'Log your days. The AI analyzes your notes, reacts, and automatically replans your next week if you slip up.',
    icon: LineChart,
    color: 'text-green-500'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">How HabitPilot Works</h2>
          <p className="text-xl text-neutral font-medium">Three simple steps to building routines that stick.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card-bg/50 border-card-border hover:bg-card-bg hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(37,99,235,0.3)] group cursor-default">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-background border border-card-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral font-medium leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
