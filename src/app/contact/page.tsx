'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl min-h-screen">
      <h1 className="text-4xl font-black text-foreground mb-4 text-center">Contact Us</h1>
      <p className="text-center text-neutral mb-8">Have a question or feedback? We'd love to hear from you.</p>
      
      <Card className="bg-card-bg border-card-border shadow-sm p-4">
        <CardContent>
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
              <p className="text-neutral mb-6">We'll get back to you as soon as possible.</p>
              <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input type="text" required className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input type="email" required className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea required rows={5} className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary text-foreground"></textarea>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
          <div className="mt-8 pt-6 border-t border-card-border text-center">
            <Link href="/" className="text-primary hover:underline font-medium text-sm">← Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
