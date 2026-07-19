'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function Hero() {
  const [typedReaction, setTypedReaction] = useState('');
  const fullReaction = "Great job nailing the morning jog! Since you felt energetic, maybe we push to 20 minutes next week?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedReaction(fullReaction.substring(0, i));
      i++;
      if (i > fullReaction.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background -z-10" />
      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary-dark mb-6">
            Your personal <br/>
            <span className="text-secondary-dark">AI habit coach</span>
          </h1>
          <p className="text-xl text-neutral mb-8 leading-relaxed">
            HabitPilot doesn't just track your habits. It designs a personalized routine, adapts it based on your actual performance, and gives you actionable coaching every single day.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="text-lg px-8">Start for Free</Button>
            <Button size="lg" variant="outline" className="text-lg px-8">See How it Works</Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-3xl transform rotate-3 scale-105 -z-10" />
          <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-white/40 shadow-xl">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral uppercase tracking-wider mb-2">Today's Check-in</h3>
              <div className="flex items-center justify-between p-4 rounded-xl border border-card-border bg-neutral-light/50">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
                  <span className="font-medium text-foreground">Morning Jog (15m)</span>
                </div>
                <span className="text-sm text-neutral">Note: Felt great today!</span>
              </div>
            </div>
            
            <div className="bg-primary-dark/5 p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">AI</div>
                <span className="text-sm font-semibold text-primary-dark">HabitPilot Reaction</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed min-h-[40px]">
                {typedReaction}
                <span className="animate-pulse inline-block ml-1 w-1.5 h-4 bg-primary align-middle" />
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
