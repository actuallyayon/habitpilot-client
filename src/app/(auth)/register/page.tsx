'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/auth/google', { token: credentialResponse.credential });
      login(data.accessToken, { _id: data._id, name: data.name, email: data.email, plan: data.plan, role: data.role, avatarUrl: data.avatarUrl });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google registration failed');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      login(data.accessToken, { _id: data._id, name: data.name, email: data.email, plan: data.plan, role: data.role });
      router.push('/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card-bg border border-card-border p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Habit</span>
              <span className="text-foreground">Pilot</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">Create your account</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground" />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </span>
            ) : 'Sign up'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card-bg px-2 text-neutral">Or register with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google registration failed')}
              useOneTap
              theme="outline"
              size="large"
              shape="rectangular"
              width="350"
            />
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-neutral">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
