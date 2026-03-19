'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  BookmarkIcon, 
  ClockIcon, 
  CreditCardIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { userApi, subscriptionApi } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Article, Subscription, PaginatedResponse } from '@/types';
import toast from 'react-hot-toast';

type Tab = 'bookmarks' | 'history' | 'subscription';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('bookmarks');
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [history, setHistory] = useState<Article[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, logout, isLoading: authLoading } = useAuth();

  const getCategorySlug = (article: Article) => {
    const cats = (article as any)?._embedded?.['wp:term']?.[0];
    if (cats && cats.length > 0) {
      return cats[0].slug;
    }
    return 'news';
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [bookmarksData, historyData, subscriptionData] = await Promise.all([
          userApi.getBookmarks({ per_page: 10 }),
          userApi.getReadingHistory({ per_page: 10 }),
          subscriptionApi.getCurrent(),
        ]);
        
        setBookmarks((bookmarksData as PaginatedResponse<Article>).data);
        setHistory((historyData as PaginatedResponse<Article>).data);
        setSubscription((subscriptionData as { subscription: Subscription }).subscription);
        setIsPremium((subscriptionData as { is_premium: boolean }).is_premium);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleRemoveBookmark = async (articleId: number) => {
    try {
      await userApi.removeBookmark(articleId);
      setBookmarks(bookmarks.filter(a => a.id !== articleId));
      toast.success('Removed from bookmarks');
    } catch (error) {
      toast.error('Failed to remove bookmark');
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    
    try {
      await subscriptionApi.cancel();
      toast.success('Subscription cancelled');
      setIsPremium(false);
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon, count: bookmarks.length },
    { id: 'history', label: 'Reading History', icon: ClockIcon, count: history.length },
    { id: 'subscription', label: 'Subscription', icon: CreditCardIcon },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60"
        title="My Dashboard"
        subtitle="Manage your account and preferences"
        height="300px"
      />
      <main className="container-custom py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-white/80">{user.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  isPremium ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {isPremium ? 'Premium Member' : 'Free Plan'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-white dark:bg-dark-800 rounded-xl p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-dark-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-auto text-sm opacity-70">({tab.count})</span>
                    )}
                  </button>
                ))}
                <hr className="my-2 border-dark-200 dark:border-dark-700" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </aside>

            <div className="flex-1">
              {activeTab === 'bookmarks' && (
                <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Your Bookmarks</h2>
                  {bookmarks.length > 0 ? (
                    <div className="space-y-4">
                      {bookmarks.map((article) => (
                        <div key={article.id} className="flex gap-4 p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <Link href={`/post/${article.slug}`} className="font-medium hover:text-primary line-clamp-1">
                              {article.title}
                            </Link>
                            <p className="text-sm text-dark-500 mt-1">
                              {article.category?.name} • {format(new Date(article.published_at), 'MMM d, yyyy')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveBookmark(article.id)}
                            className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg text-dark-500"
                          >
                            <BookmarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookmarkIcon className="w-12 h-12 mx-auto text-dark-300 mb-4" />
                      <p className="text-dark-500">No bookmarks yet</p>
                      <Link href="/" className="text-primary hover:underline mt-2 inline-block">
                        Browse articles
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Reading History</h2>
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map((item: Article & { read_at?: string }) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <Link href={`/post/${item.slug}`} className="font-medium hover:text-primary line-clamp-1">
                              {item.title}
                            </Link>
                            <p className="text-sm text-dark-500 mt-1">
                              Read {item.read_at ? format(new Date(item.read_at), 'MMM d, yyyy') : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ClockIcon className="w-12 h-12 mx-auto text-dark-300 mb-4" />
                      <p className="text-dark-500">No reading history</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'subscription' && (
                <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-6">Your Subscription</h2>
                  {isPremium && subscription ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="font-medium text-primary">Premium Active</p>
                        <p className="text-sm text-dark-600 mt-1">
                          {subscription.plan_type === 'yearly' ? 'Yearly' : 'Monthly'} plan
                        </p>
                        <p className="text-sm text-dark-500 mt-1">
                          Expires: {format(new Date(subscription.end_date), 'MMMM d, yyyy')}
                        </p>
                      </div>
                      <button
                        onClick={handleCancelSubscription}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Cancel subscription
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-dark-500 mb-4">You're on the free plan</p>
                      <Link href="/subscribe" className="btn-primary">
                        Upgrade to Premium
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
