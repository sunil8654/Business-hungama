'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { authApi } from '@/lib/api';

interface ResetPasswordForm {
  password: string;
  password_confirmation: string;
}

function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!email || !token) {
      toast.error('Invalid reset link');
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPassword({
        email,
        token,
        password: data.password,
        password_confirmation: data.password_confirmation
      });
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-16 container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Reset Link</h1>
          <p className="text-dark-600 mb-6">This password reset link is invalid or has expired.</p>
          <Link href="/forgot-password" className="btn-primary">Request New Link</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60"
        title="Reset Password"
        subtitle="Create new password"
        height="300px"
      />
      <div className="flex items-center justify-center -mt-16 relative z-10 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Create New Password</h1>
            <p className="text-dark-600 dark:text-dark-400 text-center mb-6">
              Enter your new password below.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  {...register('password_confirmation', { 
                    required: 'Please confirm your password',
                    validate: (value) => 
                      value === watch('password') || 'Passwords do not match'
                  })}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-600 dark:text-dark-400">
                Remember your password?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
