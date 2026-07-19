'use client';
import { useEffect } from 'react';
import { api } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
  const router = useRouter();

  useEffect(() => {
    const triggerCheckout = async () => {
      try {
        const { data } = await api.post('/stripe/create-checkout-session');
        if (data.url) {
          if (data.url.startsWith('http')) {
            window.location.href = data.url;
          } else {
            router.push(data.url);
          }
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Failed to create checkout session', error);
        alert('Failed to initiate upgrade process.');
        router.push('/dashboard');
      }
    };
    triggerCheckout();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-foreground font-medium">Redirecting to secure checkout...</p>
    </div>
  );
}
