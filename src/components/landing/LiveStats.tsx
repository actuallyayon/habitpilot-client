'use client';
import { useEffect, useState } from 'react';

export function LiveStats() {
  const [stats, setStats] = useState({ plans: 0, checkins: 0, consistency: 0 });

  useEffect(() => {
    // In a real app, we would fetch from /api/stats. For the landing page preview we'll animate dummy data.
    setStats({ plans: 14205, checkins: 894321, consistency: 42 });
  }, []);

  return (
    <section className="py-20 bg-primary-dark text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-4 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2">{stats.plans.toLocaleString()}+</div>
            <div className="text-primary-light font-medium uppercase tracking-widest text-sm">Active Plans</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2">{stats.checkins.toLocaleString()}</div>
            <div className="text-primary-light font-medium uppercase tracking-widest text-sm">Check-ins Logged</div>
          </div>
          <div className="pt-8 md:pt-0">
            <div className="text-4xl md:text-5xl font-extrabold mb-2">+{stats.consistency}%</div>
            <div className="text-primary-light font-medium uppercase tracking-widest text-sm">Avg Consistency Boost</div>
          </div>
        </div>
      </div>
    </section>
  );
}
