'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { subscriptionApi } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { SubscriptionPlan } from '@/types';
import toast from 'react-hot-toast';

export default function SubscribePage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, isPremium } = useAuth();

  useEffect(() => {
    subscriptionApi.getPlans()
      .then((data) => setPlans((data as { plans: SubscriptionPlan[] }).plans))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isPremium) {
      router.replace('/dashboard');
    }
  }, [isPremium, router]);

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/login?redirect=/subscribe');
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await subscriptionApi.createCheckout(selectedPlan) as { url: string };
      window.location.href = url;
    } catch (error) {
      toast.error('Failed to create checkout session');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1600&q=60"
        title="Subscribe to BusinessHungama"
        subtitle="Get unlimited access to exclusive content"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Unlock Premium Content</h1>
            <p className="text-xl text-dark-600 dark:text-dark-400">
              Get unlimited access to exclusive stories, ad-free experience, and premium features.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-dark-100 dark:bg-dark-800 p-1 rounded-full inline-flex">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-white dark:bg-dark-700 text-dark-900 dark:text-white shadow-sm'
                    : 'text-dark-600 dark:text-dark-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedPlan === 'yearly'
                    ? 'bg-white dark:bg-dark-700 text-dark-900 dark:text-white shadow-sm'
                    : 'text-dark-600 dark:text-dark-400'
                }`}
              >
                Yearly
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Save 33%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative bg-white dark:bg-dark-800 rounded-2xl p-8 border-2 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-dark-200 dark:border-dark-700'
                }`}
              >
                {plan.savings && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm px-4 py-1 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-dark-500 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-dark-500">/{plan.interval}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-dark-600 dark:text-dark-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-primary text-white hover:bg-primary-600'
                      : 'bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="btn-primary text-lg px-12 py-4"
            >
              {isLoading ? 'Processing...' : `Subscribe Now - $${selectedPlan === 'monthly' ? '9.99' : '79.99'}/${selectedPlan}`}
            </button>
            <p className="text-dark-500 text-sm mt-4">
              Cancel anytime. No questions asked.
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, and PayPal through our secure payment processor Stripe.'
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
                },
                {
                  q: 'Is there a free trial?',
                  a: 'We offer a 7-day free trial for new subscribers. You can cancel anytime during the trial period without being charged.'
                },
                {
                  q: 'What is included in premium content?',
                  a: 'Premium subscribers get unlimited access to all exclusive articles, ad-free experience, early access to breaking news, and member-only newsletters.'
                }
              ].map((faq, i) => (
                <details key={i} className="bg-white dark:bg-dark-800 rounded-lg p-4">
                  <summary className="font-medium cursor-pointer">{faq.q}</summary>
                  <p className="text-dark-600 dark:text-dark-400 mt-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
