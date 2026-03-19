'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { articleApi } from '@/lib/api';
import { Article } from '@/types';
import toast from 'react-hot-toast';

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

export default function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const getCategorySlug = (article: Article) => {
    const cats = (article as any)?._embedded?.['wp:term']?.[0];
    if (cats && cats.length > 0) {
      return cats[0].slug;
    }
    return 'news';
  };

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const latest = await articleApi.getLatest({ per_page: 10 });
        setLatestArticles((latest as Article[]).slice(0, 10));
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };
    fetchLatest();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (response.ok) {
        toast.success('Message sent successfully!');
        setContactForm({ name: '', email: '', subject: 'general', message: '' });
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsContactSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {children}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Latest News Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-lg font-bold">Latest News</h3>
                </div>
                <div className="space-y-4">
                  {latestArticles.slice(0, 10).map((article, index) => (
                    <Link 
                      key={article.id}
                      href={`/post/${article.slug}`}
                      className="flex gap-3 group"
                    >
                      <span className="text-2xl font-bold text-dark-200 group-hover:text-primary transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={getFeaturedImage(article)}
                          alt={getTitle(article)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {getTitle(article)}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form Sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-lg font-bold">Quick Contact</h3>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="advertising">Advertising</option>
                    <option value="editorial">Editorial</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Support</option>
                  </select>
                  <textarea
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isContactSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex justify-center gap-4">
                  <a href="https://twitter.com/BusinessHungama" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.682 10.621L20.24 3h-1.553l-5.69 6.611L8.43 3H3.19l6.88 10.007L3.19 21h1.553l5.996-6.966L15.52 21h5.24l-7.078-10.379zm-2.156 2.506L10.8 12.1 5.35 4.535h2.385l4.397 6.193.726 1.028 5.72 8.062h-2.386l-4.666-6.691z"/></svg>
                  </a>
                  <a href="https://instagram.com/BusinessHungama" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://youtube.com/@BusinessHungama" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                  <a href="https://linkedin.com/company/BusinessHungama" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
