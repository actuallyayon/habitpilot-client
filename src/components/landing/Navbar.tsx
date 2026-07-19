'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight">
            <span className="text-primary">Habit</span>
            <span className="text-foreground">Pilot</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-neutral">
          {!isAuthenticated ? (
            <>
              <Link href="/explore" className="hover:text-primary transition-colors">Explore Plans</Link>
              <Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
              <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            </>
          ) : (
            <>
              <Link href="/explore" className="hover:text-primary transition-colors text-primary font-bold">Explore</Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/check-in" className="hover:text-primary transition-colors">Today's Check-in</Link>
              <Link href="/plan" className="hover:text-primary transition-colors">My Plan</Link>
              <Link href="/progress" className="hover:text-primary transition-colors">Progress</Link>
              <Link href="/upgrade" className="hover:text-primary transition-colors">Upgrade</Link>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary hidden md:block">
                Log in
              </Link>
              <Button asChild size="sm" className="bg-primary hover:bg-primary-dark text-white">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group"
              >
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt="Avatar" 
                    className="h-8 w-8 rounded-full object-cover border border-card-border group-hover:border-primary/50 transition-colors" 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:opacity-90 transition-opacity">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="hidden md:inline-block font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {user?.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {/* Premium Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-card-border bg-card-bg/95 backdrop-blur-xl p-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-card-border mb-1">
                    <p className="text-xs font-semibold text-neutral">Signed in as</p>
                    <p className="text-sm font-bold text-foreground truncate">{user?.email}</p>
                  </div>
                  
                  <Link 
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-neutral hover:text-foreground hover:bg-neutral-light/50 transition-all font-medium"
                  >
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    Dashboard
                  </Link>

                  <Link 
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-neutral hover:text-foreground hover:bg-neutral-light/50 transition-all font-medium"
                  >
                    <UserIcon className="w-4 h-4 text-primary" />
                    Profile Settings
                  </Link>

                  <div className="h-px bg-card-border my-1" />

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-500/10 transition-all font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
