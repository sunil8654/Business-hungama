'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PlayIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Article } from '@/types';

const Sidebar = dynamic(() => import('@/components/layout/Sidebar'), { ssr: false });

interface CategoryPageProps {
  slug: string;
}

export default function CategoryPage({ slug: slugProp }: CategoryPageProps) {
  const [slug, setSlug] = useState(slugProp);
  const [category, setCategory] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSlug(slugProp);
  }, [slugProp]);

  useEffect(() => {
    if (!slug) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://businesshungama.com/cms/wp-json/wp/v2';
        
        const catResponse = await fetch(
          `${baseUrl}/categories?slug=${encodeURIComponent(slug)}&hide_empty=false`,
          { cache: 'no-store' }
        );
        
        if (catResponse.ok) {
          const cats = await catResponse.json();
          
          if (cats && cats.length > 0) {
            setCategory(cats[0]);
            
            const postsResponse = await fetch(
              `${baseUrl}/posts?categories=${cats[0].id}&per_page=20&_embed=true`,
              { cache: 'no-store' }
            );

            if (postsResponse.ok) {
              const posts = await postsResponse.json();
              setArticles(posts);
            }
          } else {
            setError('Category not found');
          }
        } else {
          setError('Failed to load category');
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load category');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  const getFeaturedImage = (article: Article) => {
    return (article as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=60';
  };

  const getTitle = (article: Article) => {
    const raw = (article as any)?.title?.rendered || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  const getExcerpt = (article: Article) => {
    const excerpt = (article as any)?.excerpt?.rendered || '';
    return String(excerpt).replace(/<[^>]*>/g, '').slice(0, 100) + '...';
  };

  const getDateTime = (article: Article) => {
    const raw = (article as any).date || '';
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getAuthorName = (article: Article) => {
    return (article as any)?._embedded?.author?.[0]?.name || 'Business Hungama';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 md:pt-36 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-48 bg-dark-200 rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-dark-200 rounded-xl" />)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 md:pt-36 pb-16">
          <div className="container-custom text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-dark-500 mb-8">{error || "Category doesn't exist"}</p>
            <Link href="/" className="btn-primary">Go to Homepage</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColor = category.color || '#6366F1';
  const categoryDescription = category.description || `Latest ${category.name} news and updates`;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Category Header */}
      <div className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-24 md:pt-36 pb-12 md:pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full mb-4" style={{ backgroundColor: categoryColor }}>
              {category.name}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{category.name}</h1>
            {categoryDescription && (
              <p className="text-dark-300 text-lg max-w-2xl mx-auto">{categoryDescription}</p>
            )}
            {category.count > 0 && (
              <p className="text-dark-400 text-sm mt-4">{category.count} articles</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Articles */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {articles.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl font-bold">Latest Articles</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.map((article, index) => {
                    const catSlug = (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.slug || slug;
                    return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                      <Link href={`/post/${article.slug}`}>
                        <div className="relative aspect-video">
                          <Image src={getFeaturedImage(article)} alt={getTitle(article)} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          {article.has_video && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                <PlayIcon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-xs text-dark-500 mb-2">
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>{getDateTime(article)}</span>
                          </div>
                          <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                            {getTitle(article)}
                          </h3>
                          <p className="text-sm text-dark-500 line-clamp-2">{getExcerpt(article)}</p>
                          <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium">
                            <span>Read More</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-dark-50 dark:bg-dark-800 rounded-xl">
                <h3 className="text-xl font-bold mb-2">No Articles Yet</h3>
                <p className="text-dark-500 mb-6">No articles in this category yet.</p>
                <Link href="/" className="btn-primary">Browse Other Categories</Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
