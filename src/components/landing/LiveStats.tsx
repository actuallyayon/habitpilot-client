'use client';
import { useEffect, useState } from 'react';

function AnimatedNumber({ value }: { value: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.floor(ease * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <>{current.toLocaleString()}</>;
}

export function LiveStats() {
  const [stats, setStats] = useState({ plans: 0, checkins: 0, consistency: 0 });

  useEffect(() => {
    // In a real app, we would fetch from /api/stats. For the landing page preview we'll animate dummy data.
    setStats({ plans: 14205, checkins: 894321, consistency: 42 });
  }, []);

  return (
    <section className="py-20 bg-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary/20">
          <div className="pt-4 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-primary-dark dark:text-primary-light">
              <AnimatedNumber value={stats.plans} />+
            </div>
            <div className="text-primary font-medium uppercase tracking-widest text-sm">Active Plans</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-primary-dark dark:text-primary-light">
              <AnimatedNumber value={stats.checkins} />
            </div>
            <div className="text-primary font-medium uppercase tracking-widest text-sm">Check-ins Logged</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-primary-dark dark:text-primary-light">
              <AnimatedNumber value={stats.consistency} />%
            </div>
            <div className="text-primary font-medium uppercase tracking-widest text-sm">Avg. Consistency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
