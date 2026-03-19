"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { articleApi } from '@/lib/api';
import { Article } from '@/types';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  category_slug?: string;
};

type NewsTickerProps = {
  news?: NewsItem[];
};

const fallbackNews: NewsItem[] = [];

export default function NewsTicker({ news: propNews }: NewsTickerProps) {
  const [news, setNews] = useState<NewsItem[]>(propNews && propNews.length > 0 ? propNews : fallbackNews);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTitle = (article: Article) => {
    const raw = (article as any)?.title?.rendered || (article as any)?.title || '';
    return String(raw).replace(/<[^>]*>/g, '');
  };

  useEffect(() => {
    if (propNews && propNews.length > 0) {
      setNews(propNews);
      return;
    }

    const fetchLatest = async () => {
      try {
        const latest = await articleApi.getLatest({ per_page: 10 });
        const items = (latest as Article[])
          .filter((a) => (a as any)?.slug && getTitle(a))
          .slice(0, 10)
          .map((a) => ({
            id: (a as any).id || Math.random(),
            title: getTitle(a),
            slug: (a as any).slug,
          }));
        if (items.length > 0) {
          setNews(items);
          return;
        }
      } catch (error) {
        console.error('Failed to load ticker news:', error);
      }
      setNews(fallbackNews);
    };

    fetchLatest();
  }, [propNews]);

  useEffect(() => {
    if (isPaused || news.length === 0) return;

    const speed = 1;
    const containerWidth = containerRef.current?.scrollWidth || 0;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

    const animate = () => {
      setPosition((prev) => {
        const newPosition = prev - speed;
        if (newPosition < -containerWidth / 2) {
          return viewportWidth;
        }
        return newPosition;
      });
    };

    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, [isPaused, news.length]);

  if (news.length === 0) {
    return (
      <div className="w-full bg-dark-900 text-white py-2 overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded ml-4">
            Latest
          </span>
          <span className="text-sm">No news yet</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full bg-dark-900 text-white py-2 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark-900 to-transparent z-10 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
          Latest
        </span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex items-center whitespace-nowrap"
        style={{ 
          transform: `translateX(${position}px)`,
          willChange: 'transform'
        }}
      >
        {[...news, ...news, ...news].map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={`/post/${item.slug}`}
            className="inline-flex items-center gap-2 px-4 hover:text-primary transition-colors cursor-pointer"
          >
            <ChevronRightIcon className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

