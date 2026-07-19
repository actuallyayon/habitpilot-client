'use client';
import { useEffect, useState } from 'react';
import { api } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckInPage() {
  const [plan, setPlan] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data } = await api.get('/agent/plans');
        if (data && data.length > 0) {
          const activePlan = data[0];
          setPlan(activePlan);
          
          // Initialize entries based on habits
          setEntries(activePlan.habits.map((h: any) => ({
            habitName: h.name,
            status: 'done', // default
            note: ''
          })));
        }
      } catch (error) {
        console.error('Failed to fetch plan', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const handleStatusChange = (index: number, status: string) => {
    const newEntries = [...entries];
    newEntries[index].status = status;
    setEntries(newEntries);
  };

  const handleNoteChange = (index: number, note: string) => {
    const newEntries = [...entries];
    newEntries[index].note = note;
    setEntries(newEntries);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await api.post('/agent/checkins', {
        planId: plan._id,
        date: today,
        entries
      });
      setReaction(data.agentReaction);
    } catch (error: any) {
      console.error('Failed to submit check-in', error);
      alert(error.response?.data?.message || 'Failed to submit check-in. Have you already checked in today?');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-foreground mb-4">No Active Plan Found</h2>
        <Button asChild>
          <Link href="/onboarding">Create a Plan</Link>
        </Button>
      </div>
    );
  }

  if (reaction) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Check-in Complete! 🎉</h1>
          <p className="text-lg text-neutral">Your AI Coach has reviewed your progress.</p>
        </div>
        
        <Card className="border-primary bg-primary/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Coach Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">{reaction}</p>
          </CardContent>
          <CardFooter className="justify-center pt-6">
            <Button asChild size="lg">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Daily Check-In</h1>
        <p className="text-neutral">Log your progress for today. Be honest! If you only did the minimum version, mark it as 'partial'.</p>
      </div>

      <div className="space-y-6">
        {plan.habits.map((habit: any, index: number) => (
          <Card key={index} className="shadow-sm border-card-border overflow-hidden">
            <div className="bg-card-bg p-4 border-b border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">{habit.name}</h3>
                <p className="text-sm text-neutral mt-1">Min: {habit.minVersion}</p>
              </div>
              <div className="flex bg-neutral-light/50 p-1 rounded-lg">
                {(['done', 'partial', 'skipped'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(index, status)}
                    className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                      entries[index].status === status
                        ? status === 'done' ? 'bg-green-500 text-white shadow-sm' 
                          : status === 'partial' ? 'bg-yellow-500 text-white shadow-sm'
                          : 'bg-red-500 text-white shadow-sm'
                        : 'text-neutral hover:bg-white hover:text-foreground dark:hover:bg-card-bg'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-background">
              <input
                type="text"
                placeholder="Optional notes (e.g., 'Felt great', 'Ran out of time')"
                value={entries[index].note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-sm text-foreground"
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} disabled={submitting} size="lg" className="min-w-[200px] h-14 text-lg">
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Analyzing...
            </span>
          ) : 'Submit Check-In'}
        </Button>
      </div>
    </div>
  );
}
