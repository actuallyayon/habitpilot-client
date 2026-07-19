'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>(['']);
  const [obstacles, setObstacles] = useState('');
  const [time, setTime] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const addGoal = () => setGoals([...goals, '']);
  const updateGoal = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };
  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      setGoals(goals.filter((_, i) => i !== index));
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const filteredGoals = goals.filter(g => g.trim() !== '');
      await api.post('/agent/plans', {
        goals: filteredGoals,
        obstacles,
        availableMinutesPerDay: time
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to generate plan', error);
      setIsGenerating(false);
      alert('Failed to generate plan. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8 flex justify-center">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= i ? 'bg-primary text-white' : 'bg-card-border text-neutral'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`w-16 h-1 mx-2 rounded ${
                  step > i ? 'bg-primary' : 'bg-card-border'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="shadow-lg border-card-border">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-foreground">What do you want to achieve?</CardTitle>
              <CardDescription className="text-lg">Let's start with your primary goals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => updateGoal(index, e.target.value)}
                    placeholder={`Goal ${index + 1} (e.g. Run a 5k, Learn Spanish)`}
                    className="flex-1 p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                    autoFocus={index === 0}
                  />
                  {goals.length > 1 && (
                    <Button variant="outline" type="button" onClick={() => removeGoal(index)} className="px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="ghost" onClick={addGoal} className="text-primary hover:bg-primary/10">
                + Add another goal
              </Button>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleNext} disabled={!goals[0].trim()} size="lg">Next Step</Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-foreground">What's holding you back?</CardTitle>
              <CardDescription className="text-lg">Tell us about the friction points or why you've failed before.</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={obstacles}
                onChange={(e) => setObstacles(e.target.value)}
                placeholder="e.g. I get too tired after work, I have unpredictable hours, I lack motivation..."
                className="w-full h-32 p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground resize-none"
                autoFocus
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} size="lg">Back</Button>
              <Button onClick={handleNext} size="lg">Next Step</Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-foreground">How much time do you have?</CardTitle>
              <CardDescription className="text-lg">Be realistic. How many minutes can you dedicate daily?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-8">
                <span className="text-6xl font-black text-primary mb-6">{time}</span>
                <span className="text-xl text-neutral mb-8">minutes per day</span>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  className="w-full max-w-md accent-primary h-2 bg-card-border rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={isGenerating} size="lg">Back</Button>
              <Button onClick={handleSubmit} disabled={isGenerating} size="lg" className="min-w-[200px]">
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Generating AI Plan...
                  </span>
                ) : 'Generate My Habit Plan'}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
