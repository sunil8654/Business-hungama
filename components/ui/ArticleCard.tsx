'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Article } from '@/types';
import { useAuth } from '@/lib/AuthContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  priority?: boolean;
}

export default function ArticleCard({ article, variant = 'default', priority = false }: ArticleCardProps) {
  const { isPremium } = useAuth();
  const showPaywall = article.is_premium && !isPremium;

  const getTitle = (a: Article) => {
    const raw = (a as any)?.title?.rendered || (a as any)?.title || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  const getExcerpt = (a: Article) => {
    const raw = (a as any)?.excerpt?.rendered || (a as any)?.excerpt || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  const getDateTime = (a: Article) => {
    const raw = (a as any).date || (a as any).published_at || (a as any).created_at;
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return '';
    return format(d, 'MMM d, yyyy h:mm a');
  };

  const getAuthorName = (a: Article) => {
    return (a as any)?.author?.name || (a as any)?._embedded?.author?.[0]?.name || (a as any).author_name || '';
  };

  const getCategoryName = (a: Article) => {
    return (a as any)?.category?.name || (a as any)?._embedded?.['wp:term']?.[0]?.[0]?.name || '';
  };

  const getCategoryColor = (a: Article) => {
    return (a as any)?.category?.color || '';
  };

  const getCategorySlug = (a: Article) => {
    const cats = (a as any)?._embedded?.['wp:term']?.[0];
    if (cats && cats.length > 0) {
      return cats[0].slug;
    }
    return 'news';
  };

  if (variant === 'featured') {
    return (
      <Link href={`/post/${article.slug}`} className="group block">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={getTitle(article)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full bg-dark-200 dark:bg-dark-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {getCategoryName(article) && (
              <span
                className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-3"
                style={{ backgroundColor: getCategoryColor(article) || '#111111' }}
              >
                {getCategoryName(article)}
              </span>
            )}
            {article.is_premium && (
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full ml-2">
                Premium
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 mb-2">
              {getTitle(article)}
            </h2>
            <p className="text-dark-200 line-clamp-2 mb-3">
              {getExcerpt(article)}
            </p>
            <div className="flex items-center gap-3 text-sm text-dark-300">
              {getAuthorName(article) && (
                <span className="font-medium text-white">{getAuthorName(article)}</span>
              )}
              {getDateTime(article) && <span>| {getDateTime(article)}</span>}
              {article.read_time && <span>| {article.read_time} min read</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/post/${article.slug}`} className="group flex gap-4">
        <div className="relative w-32 md:w-40 aspect-[4/3] flex-shrink-0 rounded-lg overflow-hidden">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={getTitle(article)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-dark-200 dark:bg-dark-700" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {getCategoryName(article) && (
            <span
              className="inline-block text-xs font-medium mb-1"
              style={{ color: getCategoryColor(article) || '#111111' }}
            >
              {getCategoryName(article)}
            </span>
          )}
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {getTitle(article)}
          </h3>
          <p className="text-sm text-dark-500 mt-1 line-clamp-1">
            {getExcerpt(article)}
          </p>
          <div className="flex items-center gap-2 text-xs text-dark-500 mt-2">
            {getDateTime(article) && <span>{getDateTime(article)}</span>}
            {article.is_premium && (
              <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">Premium</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/post/${article.slug}`} className="group flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {getCategoryName(article) && (
            <span
              className="inline-block text-xs font-medium mb-1"
              style={{ color: getCategoryColor(article) || '#111111' }}
            >
              {getCategoryName(article)}
            </span>
          )}
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors text-sm">
            {getTitle(article)}
          </h3>
          <div className="flex items-center gap-2 text-xs text-dark-500 mt-1">
            {getDateTime(article) && <span>{getDateTime(article)}</span>}
            {article.is_premium && (
              <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">Premium</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/post/${article.slug}`} className="group block">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
        {article.featured_image ? (
          <Image
            src={article.featured_image}
            alt={getTitle(article)}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-dark-200 dark:bg-dark-700" />
        )}
        {article.is_premium && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
              Premium
            </span>
          </div>
        )}
      </div>
      {getCategoryName(article) && (
        <span
          className="inline-block text-xs font-medium mb-2"
          style={{ color: getCategoryColor(article) || '#111111' }}
        >
          {getCategoryName(article)}
        </span>
      )}
      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
        {getTitle(article)}
      </h3>
      <p className="text-dark-500 text-sm line-clamp-2 mb-3">
        {getExcerpt(article)}
      </p>
      <div className="flex items-center gap-3 text-sm text-dark-500">
        {getAuthorName(article) && (
          <span className="font-medium text-dark-700 dark:text-dark-300">{getAuthorName(article)}</span>
        )}
        {getDateTime(article) && <span>| {getDateTime(article)}</span>}
      </div>
    </Link>
  );
}
