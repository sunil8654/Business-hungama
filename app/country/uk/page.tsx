"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function UKPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=60"
        title="United Kingdom"
        subtitle="Latest business news and updates from UK"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from United Kingdom</h1>
          <p className="text-lg text-dark-600 mb-8">
            Stay informed with the latest business news, market updates, and economic 
            developments from the United Kingdom. From the London Stock Exchange to 
            the tech startups of London, we cover all major business stories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Stock Markets</h3>
              <p className="text-dark-600">
                Track FTSE 100, FTSE 250, and other UK indices. Real-time updates on 
                London Stock Exchange trading activities.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Finance & Banking</h3>
              <p className="text-dark-600">
                Coverage of London's financial district, major banks, fintech innovations, 
                and regulatory developments.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of Bank of England policies, Brexit impacts, GDP growth, 
                and economic indicators affecting UK businesses.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Tech & Innovation</h3>
              <p className="text-dark-600">
                News about British startups, tech hubs, innovation in AI and fintech, 
                and the growing digital economy.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About UK Business</h2>
            <p className="text-dark-700 mb-4">
              The United Kingdom has the sixth-largest economy in the world, with a GDP of 
              over $3 trillion. London is one of the world's leading financial centers, 
              home to the London Stock Exchange and numerous international banks and financial 
              institutions.
            </p>
            <p className="text-dark-700 mb-4">
              The UK has a diverse economy with strong sectors in financial services, 
              manufacturing, creative industries, and technology. Despite the challenges 
              posed by Brexit, the country continues to be a major destination for 
              international business and investment.
            </p>
            <p className="text-dark-700 mb-4">
              The British government has been actively promoting the UK as a hub for 
              innovation and technology, with initiatives supporting startups and 
              research and development. The fintech sector in particular has seen 
              tremendous growth, with London often called the fintech capital of Europe.
            </p>
            <p className="text-dark-700">
              BusinessHungama provides comprehensive coverage of UK business news, 
              including stock market updates, corporate announcements, economic analysis, 
              and insights into the growing startup ecosystem.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
