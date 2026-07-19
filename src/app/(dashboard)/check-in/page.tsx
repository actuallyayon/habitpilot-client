'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CheckInPage() {
  const [loading, setLoading] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);

  const habits = [
    { id: '1', name: 'Morning Jog (15m)', done: false },
    { id: '2', name: 'Read 10 pages', done: false },
    { id: '3', name: 'No sugar in coffee', done: false }
  ];

  const [log, setLog] = useState(habits);
  const [note, setNote] = useState('');

  const handleToggle = (id: string) => {
    setLog(log.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to the agent
    setTimeout(() => {
      setLoading(false);
      setReaction("Great job hitting the run and avoiding sugar! Don't worry about the reading, we can adjust that if it keeps being an issue. Rest up tonight!");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Daily Check-in</h1>
        <p className="text-neutral">Log your habits and get instant feedback from your agent.</p>
      </div>

      <Card className="border-card-border shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Your Habit Stack</h3>
              <div className="space-y-3">
                {log.map(habit => (
                  <label key={habit.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${habit.done ? 'bg-primary/5 border-primary/30' : 'bg-white border-card-border hover:bg-neutral-light/30'}`}>
                    <input 
                      type="checkbox" 
                      checked={habit.done}
                      onChange={() => handleToggle(habit.id)}
                      className="w-5 h-5 accent-primary rounded"
                    />
                    <span className={`font-medium ${habit.done ? 'text-primary-dark line-through opacity-70' : 'text-foreground'}`}>
                      {habit.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Add a quick note for the agent (optional)</label>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Too tired to read tonight, but the run felt great."
                className="w-full p-3 border border-card-border rounded-lg focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </div>
          </CardContent>
          
          <CardFooter className="bg-neutral-light/30 border-t border-card-border p-6 flex-col gap-4">
            {!reaction ? (
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Agent is thinking...' : 'Submit Check-in'}
              </Button>
            ) : (
              <div className="w-full bg-primary/10 p-4 rounded-xl border border-primary/20">
                <div className="font-bold text-primary-dark mb-2 text-sm uppercase tracking-wider">Agent Reaction</div>
                <p className="text-foreground leading-relaxed">{reaction}</p>
                <Button type="button" className="mt-4 w-full" onClick={() => window.location.href='/dashboard'}>Back to Dashboard</Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
