'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, CheckSquare, Target, Settings, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Check-In', href: '/check-in', icon: CheckSquare },
    { name: 'Onboarding', href: '/onboarding', icon: Target },
    { name: 'My Plan', href: '/plan', icon: Target },
    { name: 'Manage Plans', href: '/plan/manage', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card-bg border-r border-card-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-card-border justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary">Habit</span>
              <span className="text-foreground">Pilot</span>
            </span>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-white font-medium shadow-sm' 
                    : 'text-neutral hover:bg-neutral-light hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-card-border space-y-4">
          <div className="hidden md:flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-neutral truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
