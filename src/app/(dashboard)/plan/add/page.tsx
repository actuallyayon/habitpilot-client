'use client';
import { useState } from 'react';
import { api } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AddPlanPage() {
  const [goals, setGoals] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [availableMinutes, setAvailableMinutes] = useState(30);
  const [habits, setHabits] = useState([{ name: '', trigger: '', reason: '', minVersion: '1.0' }]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddHabit = () => {
    setHabits([...habits, { name: '', trigger: '', reason: '', minVersion: '1.0' }]);
  };

  const handleHabitChange = (index: number, field: string, value: string) => {
    const newHabits = [...habits];
    newHabits[index] = { ...newHabits[index], [field]: value };
    setHabits(newHabits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/agent/plans/manual', {
        goals: goals.split(',').map(g => g.trim()),
        obstacles,
        availableMinutesPerDay: availableMinutes,
        habits
      });
      router.push('/plan/manage');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create plan');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Create Custom Plan</h1>
        <p className="text-neutral">Manually configure your habit routines without AI generation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-card-bg border-card-border shadow-sm">
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Goals (comma separated)</label>
              <input type="text" required value={goals} onChange={e => setGoals(e.target.value)} placeholder="e.g., Get fit, Read more" className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Obstacles</label>
              <textarea required value={obstacles} onChange={e => setObstacles(e.target.value)} placeholder="What stops you?" className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground" rows={3}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Available Minutes per Day</label>
              <input type="number" required min="5" value={availableMinutes} onChange={e => setAvailableMinutes(Number(e.target.value))} className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-bg border-card-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Habits</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={handleAddHabit}>+ Add Habit</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {habits.map((habit, idx) => (
              <div key={idx} className="p-4 border border-card-border rounded-lg bg-background space-y-4 relative">
                <div className="absolute top-2 right-2 text-xs text-neutral font-bold">#{idx + 1}</div>
                <div>
                  <label className="block text-xs font-medium text-neutral mb-1">Habit Name</label>
                  <input type="text" required value={habit.name} onChange={e => handleHabitChange(idx, 'name', e.target.value)} placeholder="e.g., 10 Pushups" className="w-full p-2 rounded border border-card-border bg-card-bg text-foreground text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral mb-1">Trigger</label>
                  <input type="text" required value={habit.trigger} onChange={e => handleHabitChange(idx, 'trigger', e.target.value)} placeholder="e.g., After brushing teeth" className="w-full p-2 rounded border border-card-border bg-card-bg text-foreground text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral mb-1">Reason / Benefit</label>
                  <input type="text" required value={habit.reason} onChange={e => handleHabitChange(idx, 'reason', e.target.value)} placeholder="Why do this?" className="w-full p-2 rounded border border-card-border bg-card-bg text-foreground text-sm" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Plan'}
        </Button>
      </form>
    </div>
  );
}
