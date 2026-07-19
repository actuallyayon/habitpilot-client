import Link from 'next/link';
import { Button } from '../ui/Button';

export function Navbar() {
  // We'll stub out the auth state for now
  const isAuthenticated = false;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
            H
          </div>
          <span className="text-xl font-bold tracking-tight text-primary-dark">HabitPilot</span>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-neutral">
          {!isAuthenticated ? (
            <>
              <Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
              <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/check-in" className="hover:text-primary transition-colors">Today's Check-in</Link>
              <Link href="/plan" className="hover:text-primary transition-colors">My Plan</Link>
              <Link href="/progress" className="hover:text-primary transition-colors">Progress</Link>
              <Link href="/upgrade" className="hover:text-primary transition-colors">Upgrade</Link>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary hidden md:block">
                Log in
              </Link>
              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Link href="/profile">
              <div className="h-8 w-8 rounded-full bg-tertiary"></div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
