'use client';
import { useState, useEffect } from 'react';
import { api } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrashIcon, EyeIcon } from 'lucide-react';

export default function ManagePlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/agent/plans');
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    try {
      await api.delete(`/agent/plans/${planId}`);
      setPlans(plans.filter(p => p._id !== planId));
    } catch (error) {
      console.error('Failed to delete plan', error);
      alert('Failed to delete plan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Manage Plans</h1>
          <p className="text-neutral">View and delete your active habit plans.</p>
        </div>
        <Button asChild>
          <Link href="/plan/add">+ New Custom Plan</Link>
        </Button>
      </div>

      <Card className="bg-card-bg border-card-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-card-border">
                <th className="p-4 font-bold text-sm text-neutral uppercase">Goals</th>
                <th className="p-4 font-bold text-sm text-neutral uppercase">Habits Count</th>
                <th className="p-4 font-bold text-sm text-neutral uppercase">Time (m/day)</th>
                <th className="p-4 font-bold text-sm text-neutral uppercase">Created</th>
                <th className="p-4 font-bold text-sm text-neutral uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral">Loading plans...</td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral">No plans found.</td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan._id} className="border-b border-card-border hover:bg-background/50 transition-colors">
                    <td className="p-4 text-foreground font-medium">{plan.goals.join(', ') || 'Unnamed Plan'}</td>
                    <td className="p-4 text-foreground">{plan.habits.length}</td>
                    <td className="p-4 text-foreground">{plan.availableMinutesPerDay}</td>
                    <td className="p-4 text-neutral text-sm">{new Date(plan.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild className="gap-2">
                        <Link href="/dashboard"><EyeIcon className="w-4 h-4"/> View</Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(plan._id)} className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <TrashIcon className="w-4 h-4" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
