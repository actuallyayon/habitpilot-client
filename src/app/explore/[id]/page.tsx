'use client';
import { useState, useEffect } from 'react';
import { api } from '@/contexts/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';

export default function PlanDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/explore/plans/${id}`);
        setPlan(data.plan);
        setRelated(data.relatedPlans || []);
      } catch (error) {
        console.error('Error fetching plan details', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (!plan) return <div className="text-center py-20 text-neutral">Plan not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Button variant="outline" onClick={() => router.back()} className="mb-8 flex items-center gap-2">
        <ArrowLeftIcon className="w-4 h-4" /> Back to Explore
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-foreground mb-4">{plan.goals[0] || 'Community Habit Plan'}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden">
                  {plan.userId?.avatarUrl ? (
                    <img src={plan.userId.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    plan.userId?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <span className="font-medium text-foreground">{plan.userId?.name || 'Anonymous'}</span>
              </div>
              <span className="text-neutral flex items-center gap-1">
                <ClockIcon className="w-4 h-4" /> {plan.availableMinutesPerDay}m / day
              </span>
            </div>
          </div>

          <Card className="bg-card-bg border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Plan Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-neutral uppercase tracking-wider mb-2">Goals</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {plan.goals.map((g: string, i: number) => <li key={i} className="text-foreground">{g}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral uppercase tracking-wider mb-2">Obstacles Overcome</h3>
                <p className="text-foreground">{plan.obstacles}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Routines ({plan.habits.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {plan.habits.map((h: any, i: number) => (
                  <div key={i} className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="text-lg font-bold text-foreground">{h.name}</h4>
                    <p className="text-sm text-neutral mt-1"><strong>Trigger:</strong> {h.trigger}</p>
                    <p className="text-sm text-foreground mt-2">{h.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/20 shadow-sm sticky top-24">
            <CardHeader>
              <CardTitle>Adopt this Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral mb-6">Like what you see? You can use this plan as a template for your own journey.</p>
              <Button asChild className="w-full">
                <Link href="/register">Start with this Plan</Link>
              </Button>
            </CardContent>
          </Card>

          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Related Plans</h3>
              <div className="space-y-4">
                {related.map((r: any) => (
                  <Card key={r._id} className="bg-card-bg border-card-border p-4 hover:border-primary cursor-pointer transition-colors" onClick={() => router.push(`/explore/${r._id}`)}>
                    <h4 className="font-bold text-foreground text-sm line-clamp-1">{r.goals[0] || 'Plan'}</h4>
                    <p className="text-xs text-neutral mt-2 flex items-center gap-1"><ClockIcon className="w-3 h-3"/> {r.availableMinutesPerDay}m / day</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
