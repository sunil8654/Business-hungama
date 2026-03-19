'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import ArticleCard from '@/components/ui/ArticleCard';
import { articleApi } from '@/lib/api';
import { Article, PaginatedResponse } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(query);

    if (!query) {
      setArticles([]);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await articleApi.getSearch({ q: query, per_page: 20 }) as Article[] | PaginatedResponse<Article>;
        const normalized = Array.isArray(response) ? response : response.data;
        setArticles(normalized || []);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60"
        title="Search News"
        subtitle="Find articles on any topic"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Search News</h1>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles..."
                className="flex-1 input-field"
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>
          </div>

          {query && (
            <p className="text-dark-500 mb-6">
              {isLoading ? 'Searching...' : `${articles.length} results for "${query}"`}
            </p>
          )}

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
          ) : query ? (
            <div className="text-center py-16">
              <p className="text-dark-500 text-lg">No articles found for "{query}"</p>
              <p className="text-dark-400 mt-2">Try different keywords</p>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-dark-500 text-lg">Enter a search term to find articles</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
