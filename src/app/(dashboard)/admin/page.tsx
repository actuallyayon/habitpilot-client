'use client';
import { useEffect, useState } from 'react';
import { api } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  CreditCard, 
  ShieldAlert, 
  UserCheck, 
  Search, 
  UserX, 
  ArrowUpCircle, 
  ArrowDownCircle 
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Redirect non-admins
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err: any) {
      console.error('Failed to fetch admin data', err);
      setError(err.response?.data?.message || 'Failed to load administrator data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleBlock = async (targetUser: any) => {
    if (targetUser.email === 'admin@habitpilot.com') {
      alert('Cannot block the main administrator.');
      return;
    }

    const confirmMsg = `Are you sure you want to ${targetUser.status === 'blocked' ? 'unblock' : 'block'} ${targetUser.name}?`;
    if (!confirm(confirmMsg)) return;

    try {
      setActionLoading(targetUser._id);
      const { data } = await api.post(`/admin/users/${targetUser._id}/block`);
      
      // Update local state
      setUsers(prev => prev.map(u => u._id === targetUser._id ? { ...u, status: data.user.status } : u));
      // Refresh stats
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePlan = async (targetUser: any) => {
    const targetPlan = targetUser.plan === 'pro' ? 'free' : 'pro';
    const confirmMsg = `Are you sure you want to change ${targetUser.name}'s plan to ${targetPlan.toUpperCase()}?`;
    if (!confirm(confirmMsg)) return;

    try {
      setActionLoading(targetUser._id);
      const { data } = await api.post(`/admin/users/${targetUser._id}/plan`, { plan: targetPlan });
      
      // Update local state
      setUsers(prev => prev.map(u => u._id === targetUser._id ? { ...u, plan: data.user.plan } : u));
      // Refresh stats
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update user plan.');
    } finally {
      setActionLoading(null);
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-neutral">Overview of HabitPilot growth, subscriptions, and user accounts.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-card-border bg-card-bg shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral uppercase tracking-wider mb-1">Total Users</p>
                <h3 className="text-3xl font-black text-foreground">{stats.totalUsers}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border bg-card-bg shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral uppercase tracking-wider mb-1">Pro Users</p>
                <h3 className="text-3xl font-black text-primary">{stats.proUsers}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center text-primary">
                <UserCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border bg-card-bg shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral uppercase tracking-wider mb-1">Free Users</p>
                <h3 className="text-3xl font-black text-foreground">{stats.freeUsers}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-neutral-light flex items-center justify-center text-neutral">
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border bg-card-bg shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral uppercase tracking-wider mb-1">Est. Revenue (MRR)</p>
                <h3 className="text-3xl font-black text-green-500">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <CreditCard className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart Section */}
      {stats?.signupHistory && (
        <Card className="border border-card-border bg-card-bg shadow-sm p-6">
          <CardHeader className="px-0 pt-0 pb-6">
            <CardTitle className="text-xl font-bold">Registration Growth (Past 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.signupHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary, #10b981)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-primary, #10b981)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-neutral-light/50 dark:stroke-card-border" />
                  <XAxis dataKey="date" className="text-xs text-neutral fill-neutral font-medium" tickLine={false} />
                  <YAxis className="text-xs text-neutral fill-neutral font-medium" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card-bg, #ffffff)', 
                      borderColor: 'var(--color-card-border, #e5e5e5)', 
                      borderRadius: '8px', 
                      color: 'var(--color-foreground, #000000)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="signups" stroke="var(--color-primary, #10b981)" strokeWidth={3} fillOpacity={1} fill="url(#colorSignups)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Management Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground">User Accounts</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-md bg-card-bg border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground shadow-sm"
            />
          </div>
        </div>

        <div className="border border-card-border rounded-xl bg-card-bg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-light/30 border-b border-card-border text-neutral text-xs uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border text-sm text-foreground">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-neutral">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-neutral-light/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-card-border">
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              u.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              {u.name}
                              {u.role === 'admin' && (
                                <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Admin
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          u.plan === 'pro' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-neutral-light text-neutral'
                        }`}>
                          {u.plan.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'blocked' 
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-green-500/10 text-green-500'
                        }`}>
                          {u.status === 'blocked' ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-neutral">
                        {new Date(u.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Toggle Plan Action */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTogglePlan(u)}
                            disabled={actionLoading !== null || u.role === 'admin'}
                            className="flex items-center gap-1 text-xs border-card-border"
                          >
                            {u.plan === 'pro' ? (
                              <>
                                <ArrowDownCircle className="w-3.5 h-3.5 text-neutral" />
                                Downgrade
                              </>
                            ) : (
                              <>
                                <ArrowUpCircle className="w-3.5 h-3.5 text-primary" />
                                Upgrade Pro
                              </>
                            )}
                          </Button>

                          {/* Toggle Block/Unblock Action */}
                          <Button
                            size="sm"
                            variant={u.status === 'blocked' ? 'default' : 'outline'}
                            onClick={() => handleToggleBlock(u)}
                            disabled={actionLoading !== null || u.role === 'admin'}
                            className={`flex items-center gap-1 text-xs ${
                              u.status === 'blocked' 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'text-red-500 border-red-500/30 hover:bg-red-500/10'
                            }`}
                          >
                            {u.status === 'blocked' ? (
                              <>
                                <UserCheck className="w-3.5 h-3.5" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                Block
                              </>
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
