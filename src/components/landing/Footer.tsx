import Link from 'next/link';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Ready to finally make it stick?</h2>
          <p className="text-xl text-neutral mb-8">Join thousands of users who have stopped feeling guilty about missed days and started building adaptable, lifelong habits.</p>
          <Button asChild size="lg" className="text-lg px-10 h-14 bg-primary hover:bg-primary-dark text-white">
            <Link href="/register">Build Your First Habit Plan</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-card-border pt-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-primary">Habit</span>
                <span className="text-foreground">Pilot</span>
              </span>
            </Link>
            <p className="text-sm text-neutral">The first habit tracker that adapts to you, not the other way around.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral">
              <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Log in</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} HabitPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
