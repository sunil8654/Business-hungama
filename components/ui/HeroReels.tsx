'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayIcon, ClockIcon } from '@heroicons/react/24/outline';
import { articleApi } from '@/lib/api';
import { Article } from '@/types';

interface HeroReelsProps {
  autoPlay?: boolean;
}

export default function HeroReels({ autoPlay = true }: HeroReelsProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleApi.getLatest({ per_page: 12 }) as Article[];
        setArticles(data);
      } catch (error) {
        console.error('Error fetching hero articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (!autoPlay || articles.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, articles.length]);

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
    return String(excerpt).replace(/<[^>]*>/g, '').slice(0, 80) + '...';
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

  const getCategoryColor = (article: Article) => {
    const color = (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.color;
    return color || '#6366F1';
  };

  const getCategorySlug = (article: Article) => {
    return (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
  };

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-6 overflow-hidden">
        <div className="container-custom">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-20 md:pt-28 pb-6 md:pb-8 overflow-hidden home-hero-desktop-padding">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

        <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white">
            <span className="text-primary">Trending</span> Stories
          </h2>
          <p className="text-dark-400 text-sm">Latest updates from around the world</p>
        </motion.div>

        {/* Main Featured Post */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <Link href={`/post/${articles[activeIndex].slug}`} className="block">
            <div className="relative aspect-[21/9] md:aspect-[21/8] rounded-xl overflow-hidden group">
              <Image
                src={getFeaturedImage(articles[activeIndex])}
                alt={getTitle(articles[activeIndex])}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Play Button for Video */}
              {articles[activeIndex].has_video && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <PlayIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span 
                  className="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold text-white rounded-full"
                  style={{ backgroundColor: getCategoryColor(articles[activeIndex]) }}
                >
                  {getCategoryName(articles[activeIndex])}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 lg:p-8">
                <div className="flex items-center gap-2 text-dark-200 text-[10px] md:text-sm mb-1 md:mb-2">
                  <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{getDateTime(articles[activeIndex])}</span>
                </div>
                <h3 className="text-sm md:text-2xl lg:text-3xl font-bold text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {getTitle(articles[activeIndex])}
                </h3>
                <p className="hidden md:block text-dark-200 mt-1 md:mt-2 line-clamp-2 max-w-3xl text-sm md:text-base">
                  {getExcerpt(articles[activeIndex])}
                </p>
                <div className="mt-2 md:mt-4 flex items-center gap-2 text-primary font-medium text-xs md:text-sm">
                  <span>Read Full Story</span>
                  <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* All Thumbnails Grid - Show all posts, not just active ones */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="relative"
            >
              <Link 
                href={`/post/${article.slug}`}
                className={`block relative rounded-lg overflow-hidden transition-all duration-300 ${
                  index === activeIndex 
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/30 scale-105 z-10' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={getFeaturedImage(article)}
                    alt={getTitle(article)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Video Indicator */}
                  {article.has_video && (
                    <div className="absolute top-1 right-1">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <PlayIcon className="w-2 h-2 md:w-3 md:h-3 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Active Indicator Bar */}
                  {index === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                  )}
                </div>
                
                {/* Title on hover - only on larger screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity hidden md:block">
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-[8px] lg:text-[10px] font-medium text-white line-clamp-2 leading-tight">
                      {getTitle(article)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-4">
          {articles.slice(0, Math.min(8, articles.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-6 md:w-8 bg-primary' 
                  : 'w-1.5 bg-dark-600 hover:bg-dark-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
