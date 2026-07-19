'use client';
import { useState, useEffect } from 'react';
import { api } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ExplorePage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minMinutes, setMinMinutes] = useState(0);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/explore/plans?search=${search}&minMinutes=${minMinutes}`);
      setPlans(data.plans || []);
    } catch (error) {
      console.error('Error fetching plans', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [minMinutes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlans();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Explore Community Habit Plans</h1>
        <p className="text-neutral text-lg">Discover and adopt routines created by other users and AI.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-card-bg p-6 rounded-xl border border-card-border shadow-sm">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2 w-full">
          <input 
            type="text" 
            placeholder="Search goals, obstacles, or habits..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
          />
          <Button type="submit">Search</Button>
        </form>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="text-sm font-medium text-foreground whitespace-nowrap">Min Time (m/day):</label>
          <select 
            value={minMinutes} 
            onChange={(e) => setMinMinutes(Number(e.target.value))}
            className="p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground flex-1 md:flex-none"
          >
            <option value="0">Any time</option>
            <option value="15">15+ mins</option>
            <option value="30">30+ mins</option>
            <option value="60">60+ mins</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <Card key={i} className="animate-pulse bg-card-bg border-card-border h-64"></Card>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 text-neutral bg-card-bg rounded-xl border border-card-border">
          <p className="text-xl">No plans found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => (
            <Card key={plan._id} className="bg-card-bg border-card-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader className="pb-4 border-b border-card-border/50">
                <CardTitle className="text-xl font-bold text-foreground line-clamp-1">
                  {plan.goals[0] || 'My Habit Plan'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs overflow-hidden">
                    {plan.userId?.avatarUrl ? (
                      <img src={plan.userId.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                      plan.userId?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <span className="text-sm text-neutral truncate">{plan.userId?.name || 'Anonymous'}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-neutral line-clamp-2 mb-4">
                    {plan.obstacles || 'Overcoming daily obstacles to achieve greatness.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                      {plan.habits.length} Habits
                    </span>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-md font-medium">
                      {plan.availableMinutesPerDay}m / day
                    </span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={`/explore/${plan._id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
