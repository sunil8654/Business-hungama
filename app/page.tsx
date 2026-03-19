'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsTicker from '@/components/ui/NewsTicker';
import HeroReels from '@/components/ui/HeroReels';
import { PlayIcon, ClockIcon, FireIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Article } from '@/types';
import toast from 'react-hot-toast';

const NewsletterSection = dynamic(() => import('@/components/ui/NewsletterSection'), { ssr: false });

export default function HomePage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://businesshungama.com/cms/wp-json/wp/v2';
        const response = await fetch(`${baseUrl}/posts?per_page=50&_embed=true`, { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setAllArticles(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFeaturedImage = (article: Article) => {
    if (article.featured_image) return article.featured_image;
    if ((article as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return (article as any)._embedded['wp:featuredmedia'][0].source_url;
    }
    return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=60';
  };

  const getTitle = (article: Article) => {
    const raw = (article as any)?.title?.rendered || (article as any)?.title || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  const getExcerpt = (article: Article) => {
    const excerpt = (article as any)?.excerpt?.rendered || (article as any)?.excerpt || '';
    return String(excerpt).replace(/<[^>]*>/g, '').slice(0, 120) + '...';
  };

  const getDateTime = (article: Article) => {
    const raw = (article as any).date || (article as any).published_at || (article as any).created_at;
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getCategoryName = (article: Article) => {
    return (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.name || '';
  };

  const getCategorySlug = (article: Article) => {
    return (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.slug || '';
  };

  const getCategoryColor = (article: Article) => {
    const color = (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.color;
    return color || '#6366F1';
  };

  const getAuthorName = (article: Article) => {
    return (article as any)?._embedded?.author?.[0]?.name || 'Business Hungama';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-26 md:pt-34 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-dark-200 rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-dark-200 rounded-xl" />)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const featured = allArticles.slice(0, 1)[0];
  const secondaryFeatured = allArticles.slice(1, 4);
  const latestNews = allArticles.slice(0, 8);
  const trendingNews = allArticles.slice(0, 6);
  const moreNews = allArticles.slice(4, 12);
  const editorsPick = allArticles.slice(12, 16);

  return (
    <div className="min-h-screen home-page">
      <Navbar />
      
      <main className="pt-26 md:pt-34">
        {/* Hero Reels Section */}
        <HeroReels autoPlay={true} />
        <NewsTicker />

        <div className="container-custom py-8 md:py-12">
          {/* Featured Section */}
          {featured && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Featured Stories</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:col-span-2"
                >
                  <Link href={`/post/${featured.slug}`} className="block group">
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                      <Image
                        src={getFeaturedImage(featured)}
                        alt={getTitle(featured)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                          style={{ backgroundColor: getCategoryColor(featured) }}
                        >
                          {getCategoryName(featured)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 text-dark-200 text-xs mb-2">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {getDateTime(featured)}
                          </span>
                          <span>|</span>
                          <span>{getAuthorName(featured)}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 group-hover:text-primary transition-colors">
                          {getTitle(featured)}
                        </h2>
                        <p className="text-dark-200 mt-2 line-clamp-2 hidden md:block">
                          {getExcerpt(featured)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Secondary Featured */}
                <div className="space-y-4">
                  {secondaryFeatured.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/post/${article.slug}`} className="flex gap-4 group">
                        <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={getFeaturedImage(article)}
                            alt={getTitle(article)}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span 
                            className="text-[10px] font-semibold px-2 py-0.5 text-white rounded"
                            style={{ backgroundColor: getCategoryColor(article) }}
                          >
                            {getCategoryName(article)}
                          </span>
                          <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {getTitle(article)}
                          </h3>
                          <p className="text-xs text-dark-500 mt-1">{getDateTime(article)}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Trending & Latest Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Trending */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-orange-500 rounded-full" />
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FireIcon className="w-5 h-5 text-orange-500" />
                  Trending
                </h2>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-6 space-y-4">
                {trendingNews.map((article, index) => (
                  <Link key={article.id} href={`/post/${article.slug}`} className="flex gap-4 group">
                    <span className="text-3xl font-bold text-orange-200 dark:text-orange-900 w-10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {getTitle(article)}
                      </h3>
                      <p className="text-xs text-dark-500 mt-1">{getDateTime(article)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Latest News</h2>
              </div>
              <div className="space-y-4">
                {latestNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                      <Link href={`/post/${article.slug}`} className="flex gap-4 group bg-white dark:bg-dark-800 rounded-xl p-3 hover:shadow-lg transition-shadow">
                      <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={getFeaturedImage(article)}
                          alt={getTitle(article)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span 
                          className="text-[10px] font-semibold px-2 py-0.5 text-white rounded"
                          style={{ backgroundColor: getCategoryColor(article) }}
                        >
                          {getCategoryName(article)}
                        </span>
                        <h3 className="font-bold line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                          {getTitle(article)}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-dark-500 mt-1">
                          <span>{getDateTime(article)}</span>
                          <span>|</span>
                          <span>{getAuthorName(article)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <NewsletterSection />

          {/* More News Grid */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">More News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/post/${article.slug}`}>
                    <div className="relative aspect-video">
                      <Image
                        src={getFeaturedImage(article)}
                        alt={getTitle(article)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span 
                          className="px-2 py-0.5 text-[10px] font-semibold text-white rounded"
                          style={{ backgroundColor: getCategoryColor(article) }}
                        >
                          {getCategoryName(article)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {getTitle(article)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-dark-500">
                        <ClockIcon className="w-3 h-3" />
                        <span>{getDateTime(article)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Editor's Pick */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-yellow-500 rounded-full" />
              <h2 className="text-2xl font-bold">Editor's Picks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorsPick.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/post/${article.slug}`} className="flex gap-4 group">
                    <div className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={getFeaturedImage(article)}
                        alt={getTitle(article)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <PlayIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span 
                        className="text-[10px] font-semibold px-2 py-0.5 text-white rounded"
                        style={{ backgroundColor: getCategoryColor(article) }}
                      >
                        {getCategoryName(article)}
                      </span>
                      <h3 className="font-bold line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                        {getTitle(article)}
                      </h3>
                      <p className="text-xs text-dark-500 mt-1 line-clamp-2">
                        {getExcerpt(article)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              View All News
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
