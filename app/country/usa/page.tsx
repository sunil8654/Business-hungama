"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import Link from 'next/link';

export default function USAPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1600&q=60"
        title="United States"
        subtitle="Latest business news and updates from USA"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from United States</h1>
          <p className="text-lg text-dark-600 mb-8">
            Stay updated with the latest business news, market trends, and economic developments 
            from the United States. From Wall Street to Silicon Valley, we cover all major 
            business stories that impact the American economy and global markets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Stock Markets</h3>
              <p className="text-dark-600">
                Track the performance of major indices including S&P 500, NASDAQ, and Dow Jones. 
                Real-time updates on market movements and trading volumes.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Tech Industry</h3>
              <p className="text-dark-600">
                Coverage of Silicon Valley's biggest companies, startup ecosystem, 
                IPOs, and technological innovations shaping the future.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of Federal Reserve policies, employment data, inflation rates, 
                and economic indicators affecting businesses.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Corporate News</h3>
              <p className="text-dark-600">
                Mergers, acquisitions, earnings reports, and major corporate announcements 
                from Fortune 500 companies.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About US Business</h2>
            <p className="text-dark-700 mb-4">
              The United States remains the world's largest economy, with a GDP of over $25 trillion. 
              The country is home to major financial hubs including New York City, Los Angeles, 
              Chicago, and San Francisco. The US stock market is the most influential in the world, 
              with billions of shares traded daily on major exchanges.
            </p>
            <p className="text-dark-700 mb-4">
              From technology giants in Silicon Valley to financial institutions on Wall Street, 
              the US business landscape offers diverse opportunities for investors, entrepreneurs, 
              and professionals. Our coverage includes in-depth analysis of market trends, 
              regulatory changes, and economic policies that shape the American business environment.
            </p>
            <p className="text-dark-700">
              Whether you're interested in stock market updates, startup news, or corporate 
              developments, BusinessHungama brings you comprehensive coverage of all business 
              news from across the United States.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
