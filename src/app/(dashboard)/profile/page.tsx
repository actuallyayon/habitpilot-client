'use client';
import { useState, useRef } from 'react';
import { useAuth, api } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Camera, Lock, Mail, Award, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 5MB.');
      return;
    }

    try {
      setAvatarLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (user) {
        updateUser({
          ...user,
          avatarUrl: data.url,
        });
      }

      setSuccessMsg('Avatar updated successfully!');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to upload avatar image.');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Name field cannot be empty.');
      return;
    }

    if (password) {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    try {
      setSavingProfile(true);
      const { data } = await api.put('/auth/profile', {
        name: name.trim(),
        ...(password ? { password } : {}),
      });

      if (user) {
        updateUser({
          ...user,
          name: data.user.name,
          avatarUrl: data.user.avatarUrl,
        });
      }

      setPassword('');
      setConfirmPassword('');
      setSuccessMsg('Profile information updated successfully!');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to update profile settings.');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Profile Settings</h1>
        <p className="text-neutral">Manage your account information, profile photo, and password security.</p>
      </div>

      {successMsg && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Avatar Card */}
      <Card className="border border-card-border bg-card-bg shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer" onClick={triggerFileSelect}>
            {user?.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt="Profile Avatar" 
                className="w-24 h-24 rounded-full object-cover border border-card-border group-hover:opacity-85 transition-opacity" 
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-black border border-card-border group-hover:opacity-85 transition-opacity">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>

            {avatarLoading && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left space-y-2">
            <h3 className="font-bold text-lg text-foreground">Profile Photo</h3>
            <p className="text-sm text-neutral">Click image to upload or update your photo. Supports PNG, JPG, or GIF up to 5MB.</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              className="hidden" 
            />
            <Button 
              size="sm" 
              variant="outline" 
              disabled={avatarLoading}
              onClick={triggerFileSelect}
              className="mt-1"
            >
              {avatarLoading ? 'Uploading...' : 'Choose Image'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Form */}
      <Card className="border border-card-border bg-card-bg shadow-sm">
        <CardHeader className="border-b border-card-border p-6">
          <CardTitle className="text-xl font-bold">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email (Read only) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral">Email Address</label>
              <div className="flex items-center gap-3 w-full p-3 rounded-md bg-neutral-light/30 border border-card-border text-neutral cursor-not-allowed">
                <Mail className="w-5 h-5 text-neutral-400" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <p className="text-xs text-neutral">Email address cannot be changed after registration.</p>
            </div>

            {/* Plan tier details */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral">Subscription Tier</label>
              <div className="flex items-center justify-between w-full p-3 rounded-md bg-neutral-light/30 border border-card-border">
                <div className="flex items-center gap-3">
                  <Award className={`w-5 h-5 ${user?.plan === 'pro' ? 'text-primary' : 'text-neutral-400'}`} />
                  <span className="text-sm font-bold capitalize text-foreground">{user?.plan || 'free'} Plan</span>
                </div>
                {user?.plan !== 'pro' && (
                  <Link href="/upgrade" className="text-xs font-bold text-primary hover:underline">
                    Upgrade to Pro
                  </Link>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral">Display Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Enter display name" 
                className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              />
            </div>

            <div className="h-px bg-card-border my-6" />

            <h4 className="font-bold text-foreground text-md flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Change Password (Optional)
            </h4>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral">New Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Min 6 characters" 
                  className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  placeholder="Confirm password" 
                  className="w-full p-3 rounded-md bg-background border border-card-border focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <Button type="submit" size="lg" disabled={savingProfile} className="px-8 bg-primary hover:bg-primary-dark text-white">
                {savingProfile ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Changes...
                  </span>
                ) : 'Save Profile'}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
