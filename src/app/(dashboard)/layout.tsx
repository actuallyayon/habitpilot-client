import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light/20">
      <header className="sticky top-0 z-40 bg-white border-b border-card-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-primary-dark hidden sm:block">HabitPilot</span>
          </Link>
          
          <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-neutral hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/check-in" className="text-neutral hover:text-primary transition-colors">Check-in</Link>
            <Link href="/replan" className="text-neutral hover:text-primary transition-colors">Weekly Replan</Link>
            <Link href="/reports" className="text-neutral hover:text-primary transition-colors">Insights</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-secondary-light flex items-center justify-center text-secondary-dark font-bold">
              U
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
