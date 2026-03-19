'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import ArticleCard from '@/components/ui/ArticleCard';
import { articleApi } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Article, PaginatedResponse } from '@/types';

export default function PremiumPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, isPremium } = useAuth();

  useEffect(() => {
    if (isPremium) {
      router.replace('/dashboard');
    }
  }, [isPremium, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await articleApi.getPremium({ per_page: 20 }) as PaginatedResponse<Article>;
        setArticles(data.data);
      } catch (error) {
        console.error('Error fetching premium articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1600&q=60"
        title="Premium Content"
        subtitle="Exclusive stories for our premium subscribers"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="container-custom">

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-dark-500 text-lg">No premium articles available yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
