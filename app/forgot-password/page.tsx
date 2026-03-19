'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { authApi } from '@/lib/api';

interface ForgotPasswordForm {
  email: string;
}

interface OtpVerifyForm {
  otp: string;
}

interface ResetPasswordForm {
  password: string;
  password_confirmation: string;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  const { register: registerEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm<ForgotPasswordForm>();
  const { register: registerOtp, handleSubmit: handleOtpSubmit, formState: { errors: otpErrors }, getValues: getOtpValues } = useForm<OtpVerifyForm>();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, watch, formState: { errors: passwordErrors } } = useForm<ResetPasswordForm>();

  const maskEmailAddress = (email: string) => {
    const [local, domain] = email.split('@');
    if (local.length <= 3) {
      return `${local}***@${domain}`;
    }
    return `${local.substring(0, 3)}${'*'.repeat(local.length - 3)}@${domain}`;
  };

  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await authApi.forgotPassword(data) as any;
      setEmail(data.email);
      setMaskedEmail(response.email || maskEmailAddress(data.email));
      setStep('otp');
      startCountdown();
      toast.success('OTP sent to your email!');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (data: OtpVerifyForm) => {
    setIsLoading(true);
    setRemainingAttempts(null);
    try {
      const response = await authApi.verifyPasswordOtp({ email, otp: data.otp }) as any;
      setResetToken(response.reset_token);
      setStep('reset');
      toast.success('OTP verified!');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; error?: string; remaining_attempts?: number } } };
      if (err.response?.data?.remaining_attempts !== undefined) {
        setRemainingAttempts(err.response.data.remaining_attempts);
      }
      toast.error(err.response?.data?.error || err.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      await authApi.resetPasswordWithOtp({
        email,
        reset_token: resetToken,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      toast.success('Password reset successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    try {
      await authApi.resendPasswordOtp({ email });
      setMaskedEmail(maskEmailAddress(email));
      startCountdown();
      setRemainingAttempts(null);
      toast.success('New OTP sent!');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60"
        title="Forgot Password"
        subtitle="Reset your password with OTP"
        height="300px"
      />
      <div className="flex items-center justify-center -mt-16 relative z-10 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
            {/* Step 1: Enter Email */}
            {step === 'email' && (
              <>
                <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password?</h1>
                <p className="text-dark-600 dark:text-dark-400 text-center mb-6">
                  Enter your email to receive an OTP code.
                </p>
                
                <form onSubmit={handleEmailSubmit(sendOtp)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      {...registerEmail('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                    {emailErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{emailErrors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Enter OTP */}
            {step === 'otp' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Enter OTP</h1>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">
                    We sent a 6-digit code to<br />
                    <span className="font-medium text-primary">{maskedEmail}</span>
                  </p>
                </div>
                
                <form onSubmit={handleOtpSubmit(verifyOtp)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">OTP Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      {...registerOtp('otp', { 
                        required: 'OTP is required',
                        minLength: { value: 6, message: 'OTP must be 6 digits' },
                        maxLength: { value: 6, message: 'OTP must be 6 digits' },
                        pattern: { value: /^\d+$/, message: 'OTP must contain only numbers' }
                      })}
                      className="input-field text-center text-2xl tracking-widest font-mono"
                      placeholder="000000"
                    />
                    {otpErrors.otp && (
                      <p className="text-red-500 text-sm mt-1">{otpErrors.otp.message}</p>
                    )}
                    {remainingAttempts !== null && remainingAttempts <= 3 && (
                      <p className="text-red-500 text-sm mt-1">
                        {remainingAttempts} attempts remaining
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>

                <div className="mt-6 text-center space-y-2">
                  <button
                    onClick={resendOtp}
                    disabled={countdown > 0 || isLoading}
                    className="text-sm text-primary hover:underline disabled:text-dark-400 disabled:no-underline"
                  >
                    {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                  </button>
                  <br />
                  <button
                    onClick={() => setStep('email')}
                    className="text-sm text-dark-500 hover:text-primary"
                  >
                    Use different email
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Set New Password */}
            {step === 'reset' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">
                    Create a strong password for your account
                  </p>
                </div>
                
                <form onSubmit={handlePasswordSubmit(resetPassword)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      {...registerPassword('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      className="input-field"
                      placeholder="••••••••"
                    />
                    {passwordErrors.password && (
                      <p className="text-red-500 text-sm mt-1">{passwordErrors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <input
                      type="password"
                      {...registerPassword('password_confirmation', { 
                        required: 'Please confirm your password',
                        validate: (value) => 
                          value === watch('password') || 'Passwords do not match'
                      })}
                      className="input-field"
                      placeholder="••••••••"
                    />
                    {passwordErrors.password_confirmation && (
                      <p className="text-red-500 text-sm mt-1">{passwordErrors.password_confirmation.message}</p>
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
              </>
            )}

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
