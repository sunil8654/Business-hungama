'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, UserCircleIcon, BookmarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/AuthContext';
import { categoryApi } from '@/lib/api';
import { Category } from '@/types';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    categoryApi.getFeatured()
      .then((data) => setCategories(data as Category[]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
    const nextTheme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', nextTheme);
    }
  };

  // NOTE: If the API fails or returns no categories, provide a static fallback
  const fallbackCategories: any[] = [
    { id: 9991, name: 'Business', slug: 'business', color: '#D97706', description: '', parent_id: undefined, order: 1, is_featured: false },
    { id: 9992, name: 'Share Market', slug: 'share-market', color: '#10B981', description: '', parent_id: undefined, order: 2, is_featured: false },
    { id: 9993, name: 'Startup', slug: 'startup', color: '#8B5CF6', description: '', parent_id: undefined, order: 3, is_featured: false },
    { id: 9994, name: 'Bollywood', slug: 'bollywood', color: '#EC4899', description: '', parent_id: undefined, order: 4, is_featured: false },
    { id: 9995, name: 'Technology', slug: 'technology', color: '#2563EB', description: '', parent_id: undefined, order: 5, is_featured: false },
    { id: 9996, name: 'Economy', slug: 'economy', color: '#F59E0B', description: '', parent_id: undefined, order: 6, is_featured: false },
    { id: 9997, name: 'Sports', slug: 'sports', color: '#EF4444', description: '', parent_id: undefined, order: 7, is_featured: false },
    { id: 9998, name: 'World', slug: 'world', color: '#4B9CD3', description: '', parent_id: undefined, order: 8, is_featured: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Choose categories to render: API results if available, otherwise static fallback
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories as any[];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-dark-900'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg"
              onClick={() => setIsMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold font-display">
                <span className="text-primary">Business</span><span className="text-dark-900 dark:text-white">Hungama</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors flex items-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8" />
                  )}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-dark-200 dark:border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <p className="font-medium px-2 py-1 truncate">{user.name}</p>
                    <p className="text-sm text-dark-500 px-2 pb-2 truncate">{user.email}</p>
                    <hr className="my-2 border-dark-200 dark:border-dark-700" />
                    <Link href="/dashboard" className="block px-2 py-2 text-sm hover:bg-dark-100 dark:hover:bg-dark-700 rounded">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/bookmarks" className="block px-2 py-2 text-sm hover:bg-dark-100 dark:hover:bg-dark-700 rounded">
                      Bookmarks
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-dark-100 dark:hover:bg-dark-700 rounded">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center h-full">
                <Link href="/login" className="inline-flex items-center px-3 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Sign In
                </Link>
              </div>
            )}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <a
                href="https://www.twitter.com/BusinessHungama"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                aria-label="BusinessHungama on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.682 10.621L20.24 3h-1.553l-5.69 6.611L8.43 3H3.19l6.88 10.007L3.19 21h1.553l5.996-6.966L15.52 21h5.24l-7.078-10.379zm-2.156 2.506L10.8 12.1 5.35 4.535h2.385l4.397 6.193.726 1.028 5.72 8.062h-2.386l-4.666-6.691z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/BusinessHungama"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                aria-label="BusinessHungama on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@BusinessHungama"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                aria-label="BusinessHungama on YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/BusinessHungama"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                aria-label="BusinessHungama on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category bar row (desktop/tablet only) */}
        <div className="hidden md:block w-full overflow-x-auto border-t border-dark-200 dark:border-dark-700">
          <nav className="flex items-center gap-1 min-w-max px-4 py-2">
            {(displayCategories as any[]).slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}/`}
                    className={`px-3 py-2 text-sm font-medium rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors ${
                      pathname === `/${category.slug}` ? 'bg-dark-100 dark:bg-dark-800' : ''
                  }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-dark-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4 border-b border-dark-200 dark:border-dark-700 flex items-center justify-between">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {displayCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}/`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
                {!user && (
                  <>
                    <hr className="my-4 border-dark-200 dark:border-dark-700" />
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 font-medium text-primary whitespace-nowrap">
                      Sign In
                    </Link>
                  </>
                )}
                <hr className="my-4 border-dark-200 dark:border-dark-700" />
                <Link href="/premium" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 font-medium text-primary">
                  Premium
                </Link>
                <Link href="/subscribe" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 font-medium">
                  Subscribe
                </Link>
                <hr className="my-4 border-dark-200 dark:border-dark-700" />
                <p className="px-4 text-xs font-semibold text-dark-500 uppercase mb-2">Countries</p>
                <Link href="/country/usa" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  United States
                </Link>
                <Link href="/country/india" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  India
                </Link>
                <Link href="/country/uk" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  United Kingdom
                </Link>
                <Link href="/country/china" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  China
                </Link>
                <Link href="/country/uae" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  UAE
                </Link>
                <Link href="/country/australia" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Australia
                </Link>
                <hr className="my-4 border-dark-200 dark:border-dark-700" />
                <p className="px-4 text-xs font-semibold text-dark-500 uppercase mb-2">Legal</p>
                <Link href="/company/terms-of-service" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Terms of Service
                </Link>
                <Link href="/company/privacy-policy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/company/cookie-policy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Cookie Policy
                </Link>
                <Link href="/company/disclaimer" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Disclaimer
                </Link>
                <Link href="/company/accessibility" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-sm">
                  Accessibility
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="fixed top-0 left-0 right-0 bg-white dark:bg-dark-900 z-50 p-4 shadow-lg"
            >
              <form onSubmit={handleSearch} className="container-custom">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button type="button" onClick={() => setSearchOpen(false)} className="self-start p-2 hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news..."
                    className="w-full sm:flex-1 bg-transparent text-base sm:text-lg outline-none border border-dark-200 dark:border-dark-700 rounded-lg px-3 py-2"
                    autoFocus
                  />
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}




