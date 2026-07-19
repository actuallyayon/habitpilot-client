'use client';
import { useEffect, useState } from 'react';
import { api } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await api.get('/agent/plans');
        setPlans(data);
      } catch (error) {
        console.error('Failed to fetch plans', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-extrabold text-foreground mb-4">Welcome to HabitPilot, {user?.name}!</h2>
        <p className="text-lg text-neutral mb-8">You haven't generated a habit plan yet. Let our AI coach design one for you.</p>
        <Button asChild size="lg">
          <Link href="/onboarding">Create Your First Plan</Link>
        </Button>
      </div>
    );
  }

  const activePlan = plans[0]; // Most recent active plan

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-neutral">Here is your current AI-generated Habit Stack.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Habit Stack</h2>
          <div className="space-y-4">
            {activePlan.habits.map((habit: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-primary shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-foreground">{habit.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <span className="text-xs font-bold uppercase text-neutral tracking-wider block mb-1">Trigger</span>
                      <p className="text-foreground bg-primary/5 p-2 rounded-md font-medium text-sm border border-primary/10">{habit.trigger}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-neutral tracking-wider block mb-1">Min Version</span>
                      <p className="text-foreground bg-secondary/10 dark:bg-secondary/20 p-2 rounded-md font-medium text-sm">{habit.minVersion}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase text-neutral tracking-wider block mb-1">AI Reasoning</span>
                    <p className="text-sm text-neutral italic">"{habit.reason}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button asChild size="lg">
              <Link href="/check-in">Go to Daily Check-in</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-card-bg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Plan Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-neutral block mb-1">Your Goals</span>
                <ul className="list-disc list-inside text-sm text-foreground">
                  {activePlan.goals.map((g: string, i: number) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-neutral block mb-1">Known Obstacles</span>
                <p className="text-sm text-foreground">{activePlan.obstacles || 'None provided'}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-neutral block mb-1">Daily Commitment</span>
                <p className="text-sm text-foreground font-semibold">{activePlan.availableMinutesPerDay} minutes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-primary mb-2">Need a reset?</h3>
              <p className="text-sm text-neutral mb-4">If this plan isn't working for you, you can always generate a new one.</p>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                <Link href="/onboarding">Draft New Plan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
