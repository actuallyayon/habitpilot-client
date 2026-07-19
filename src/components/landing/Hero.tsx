'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export function Hero() {
  const { user } = useAuth();
  const [typedReaction, setTypedReaction] = useState('');
  const fullReaction = "Great job nailing the morning jog! Since you felt energetic, let's push to 20 minutes next week!";

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
    <section className="relative overflow-hidden pt-28 pb-40">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background blur-3xl rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/15 via-background to-background blur-3xl rounded-full mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: [-8, 8, -8] }}
            transition={{ 
              opacity: { delay: 0.2, duration: 0.5 },
              scale: { delay: 0.2, duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Future of Habit Tracking</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Build routines that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">actually adapt.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral mb-10 leading-relaxed font-medium">
            HabitPilot uses agentic AI to design, track, and constantly recalibrate your habits based on your real life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-7 bg-primary hover:bg-primary-dark text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 rounded-xl relative overflow-hidden group">
              <Link href={user ? "/dashboard" : "/register"}>
                <span className="relative z-10">{user ? "Go to Dashboard" : "Start for Free"}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-7 border-2 border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-xl">
              <Link href="/#how-it-works">See How it Works</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative perspective-1000"
        >
          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <Card className="p-8 bg-card-bg/90 backdrop-blur-xl border-card-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl">
              <div className="mb-6 flex justify-between items-center border-b border-card-border pb-4">
                <h3 className="text-sm font-bold text-neutral uppercase tracking-widest">Today's Check-in</h3>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">Live Agent</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-card-border mb-6 group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Morning Jog</span>
                    <span className="text-xs text-neutral">15 minutes</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-neutral italic">"Felt energetic today!"</span>
              </div>
              
              <div className="bg-primary/5 p-5 rounded-xl border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded bg-primary shadow-lg shadow-primary/30 text-white flex items-center justify-center font-bold text-[10px]">AI</div>
                  <span className="text-sm font-bold text-primary">HabitPilot Analysis</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {typedReaction}
                  <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-primary align-middle" />
                </p>
              </div>
            </Card>
          </motion.div>
          
          {/* Decorative background glow behind the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
