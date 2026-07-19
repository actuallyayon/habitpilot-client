import { Card } from '../ui/Card';
import { Activity, Brain, Moon, Flower, BookOpen, Rocket } from 'lucide-react';

export function HabitCategories() {
  const categories = [
    { name: 'Health & Fitness', icon: <Activity className="w-8 h-8 text-primary" />, count: '12.5k plans' },
    { name: 'Focus & Deep Work', icon: <Brain className="w-8 h-8 text-primary" />, count: '8.2k plans' },
    { name: 'Sleep Hygiene', icon: <Moon className="w-8 h-8 text-primary" />, count: '5.4k plans' },
    { name: 'Mindfulness', icon: <Flower className="w-8 h-8 text-primary" />, count: '6.1k plans' },
    { name: 'Learning & Skills', icon: <BookOpen className="w-8 h-8 text-primary" />, count: '9.8k plans' },
    { name: 'Career Growth', icon: <Rocket className="w-8 h-8 text-primary" />, count: '4.3k plans' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Whatever your goal, the agent can map it.</h2>
        <p className="text-neutral mb-12 max-w-2xl mx-auto">From running your first 5k to writing a novel, HabitPilot breaks down massive goals into daily, adaptable systems.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((c, i) => (
            <Card key={i} className="p-6 flex flex-col items-center justify-center hover:bg-neutral-light/50 transition-colors cursor-pointer border-card-border bg-card-bg">
              <div className="mb-4">{c.icon}</div>
              <h4 className="font-semibold text-foreground">{c.name}</h4>
              <p className="text-xs text-neutral mt-1">{c.count}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
