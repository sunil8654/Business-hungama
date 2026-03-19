'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ClockIcon, ShareIcon, PrinterIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Article } from '@/types';

const Sidebar = dynamic(() => import('@/components/layout/Sidebar'), { ssr: false });

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage({ slug: slugProp }: ArticlePageProps) {
  const [slug, setSlug] = useState(slugProp);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
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
        
        const response = await fetch(
          `${baseUrl}/posts?slug=${encodeURIComponent(slug)}&_embed=true`,
          { cache: 'no-store' }
        );
        
        if (response.ok) {
          const posts = await response.json();
          
          if (posts && posts.length > 0) {
            const post = posts[0];
            setArticle(post);
            
            const catId = post.categories?.[0];
            if (catId) {
              const relatedResponse = await fetch(
                `${baseUrl}/posts?categories=${catId}&per_page=4&exclude=${post.id}&_embed=true`,
                { cache: 'no-store' }
              );
              if (relatedResponse.ok) {
                const related = await relatedResponse.json();
                setRelatedArticles(related);
              }
            }
          } else {
            setError('Article not found');
          }
        } else {
          setError('Failed to load article');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  const getFeaturedImage = (article: Article) => {
    return (article as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
  };

  const getTitle = (article: Article) => {
    const raw = (article as any)?.title?.rendered || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  const getContent = (article: Article) => {
    return (article as any)?.content?.rendered || '';
  };

  const getExcerpt = (article: Article) => {
    const excerpt = (article as any)?.excerpt?.rendered || '';
    return String(excerpt).replace(/<[^>]*>/g, '');
  };

  const getDateTime = (article: Article) => {
    const raw = (article as any).date || '';
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getAuthorName = (article: Article) => {
    return (article as any)?._embedded?.author?.[0]?.name || 'Business Hungama';
  };

  const getAuthorAvatar = (article: Article) => {
    return (article as any)?._embedded?.author?.[0]?.avatar_urls?.['96'] || 
           'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80';
  };

  const getCategoryName = (article: Article) => {
    return (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
  };

  const getCategorySlug = (article: Article) => {
    return (article as any)?._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
  };

  const getReadingTime = (article: Article) => {
    const content = getContent(article);
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const getArticleUrl = (article: Article) => {
    return `/post/${article.slug}`;
  };

  const getCategoryUrl = (article: Article) => {
    const catSlug = getCategorySlug(article);
    return `/${catSlug}`;
  };

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://businesshungama.com/post/${slug}`;
  };

  const handleShare = async () => {
    const url = getCurrentUrl();
    const title = article ? getTitle(article) : 'Check out this article';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title} - BusinessHungama`,
          url: url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Link copied to clipboard!');
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const title = encodeURIComponent(article ? getTitle(article) : 'Check out this article');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(getCurrentUrl());
    const title = encodeURIComponent(article ? getTitle(article) : 'Check out this article');
    window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 md:pt-28 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-dark-200 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-dark-200 rounded w-3/4" />
                <div className="h-8 bg-dark-200 rounded w-1/2" />
                <div className="h-4 bg-dark-200 rounded w-1/4" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-dark-200 rounded" />)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 md:pt-28 pb-16">
          <div className="container-custom text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-dark-500 mb-8">{error || "Article doesn't exist"}</p>
            <Link href="/" className="btn-primary">Go to Homepage</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="pt-20 md:pt-28 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="relative aspect-video mb-8 rounded-2xl overflow-hidden">
                  <Image 
                    src={getFeaturedImage(article)} 
                    alt={getTitle(article)} 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Link 
                    href={getCategoryUrl(article)}
                    className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {getCategoryName(article)}
                  </Link>
                  <span className="flex items-center gap-1.5 text-dark-500 text-sm">
                    <ClockIcon className="w-4 h-4" />
                    {getReadingTime(article)} min read
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {getTitle(article)}
                </h1>

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-dark-200">
                  <Image 
                    src={getAuthorAvatar(article)} 
                    alt={getAuthorName(article)} 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{getAuthorName(article)}</p>
                    <p className="text-sm text-dark-500">{getDateTime(article)}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button onClick={handleShare} className="p-2 hover:bg-dark-100 rounded-full transition-colors" title="Share">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={handlePrint} className="p-2 hover:bg-dark-100 rounded-full transition-colors" title="Print">
                      <PrinterIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  <div dangerouslySetInnerHTML={{ __html: getContent(article) }} />
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-8">
                  <span className="text-dark-500">Tags:</span>
                  {['Business', 'News', 'Trending'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-dark-100 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between py-6 border-t border-b border-dark-200">
                  <div className="flex items-center gap-4">
                    <span className="text-dark-500">Share this article:</span>
                    <div className="flex items-center gap-2">
                      <button onClick={shareToFacebook} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" title="Share on Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </button>
                      <button onClick={shareToTwitter} className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors" title="Share on Twitter">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </button>
                      <button onClick={shareToWhatsApp} className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors" title="Share on WhatsApp">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                      </button>
                      <button onClick={() => copyToClipboard(getCurrentUrl())} className="w-10 h-10 bg-dark-600 text-white rounded-full flex items-center justify-center hover:bg-dark-700 transition-colors" title="Copy Link">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                {relatedArticles.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full" />
                      <h2 className="text-2xl font-bold">Related Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedArticles.map((relatedArticle) => (
                        <Link 
                          key={relatedArticle.id} 
                          href={getArticleUrl(relatedArticle)}
                          className="group bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                        >
                          <div className="relative aspect-video">
                            <Image 
                              src={getFeaturedImage(relatedArticle)} 
                              alt={getTitle(relatedArticle)} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                              {getTitle(relatedArticle)}
                            </h3>
                            <p className="text-sm text-dark-500 mt-2 line-clamp-2">
                              {getExcerpt(relatedArticle)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
