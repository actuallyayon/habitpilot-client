'use client';
import { useEffect, useState } from 'react';
import { api } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data: checkIns } = await api.get('/agent/checkins');
        // Process checkins into a chart format
        const chartData = checkIns.map((ci: any) => ({
          date: new Date(ci.date).toLocaleDateString(),
          score: ci.overallScore
        })).reverse();
        setData(chartData);
      } catch (error) {
        console.error('Failed to fetch checkins', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Your Progress</h1>
        <p className="text-neutral">Visualize your habit consistency over time.</p>
      </div>

      <Card className="bg-card-bg shadow-sm">
        <CardHeader>
          <CardTitle>Consistency Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis domain={[0, 100]} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)' }}
                    itemStyle={{ color: 'var(--color-primary)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-neutral">
                Not enough check-in data to display progress yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
