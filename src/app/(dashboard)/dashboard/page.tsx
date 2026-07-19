'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircleIcon, SparklesIcon, CalendarIcon } from '@heroicons/react/24/outline';

const data = [
  { name: 'Mon', consistency: 40 },
  { name: 'Tue', consistency: 60 },
  { name: 'Wed', consistency: 50 },
  { name: 'Thu', consistency: 80 },
  { name: 'Fri', consistency: 75 },
  { name: 'Sat', consistency: 90 },
  { name: 'Sun', consistency: 100 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Jane.</h1>
          <p className="text-neutral">Here is how your current habit stack is performing.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/plan">Edit Plan</Link>
          </Button>
          <Button asChild>
            <Link href="/check-in">Log Today</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">12 Days</div>
              <div className="text-sm text-neutral">Current Streak</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary-dark">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">84%</div>
              <div className="text-sm text-neutral">Weekly Consistency</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-neutral">Active Habits</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Consistency Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Line type="monotone" dataKey="consistency" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-card-border shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-primary-dark">Agent Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white rounded-lg border border-primary/20 text-sm text-foreground">
                <span className="font-bold">Daily Note:</span> Great job sticking to the morning routine! Tomorrow might be rainy, maybe do indoor yoga instead of a run?
              </div>
              <div className="p-3 bg-white rounded-lg border border-primary/20 text-sm text-foreground">
                <span className="font-bold flex items-center gap-1 text-secondary-dark"><SparklesIcon className="w-4 h-4"/> Weekly Replan Ready</span> 
                I've noticed friction with your reading habit. Review my proposed changes.
                <Button asChild size="sm" variant="outline" className="w-full mt-3">
                  <Link href="/replan">Review Proposal</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
