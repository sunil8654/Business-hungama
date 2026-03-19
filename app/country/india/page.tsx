"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function IndiaPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=60"
        title="India"
        subtitle="Latest business news and updates from India"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from India</h1>
          <p className="text-lg text-dark-600 mb-8">
            Get the latest business news, market updates, and economic developments from India. 
            From Mumbai's Dalal Street to Bangalore's tech parks, we cover all major business 
            stories from across the country.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Stock Markets</h3>
              <p className="text-dark-600">
                Track Sensex, Nifty 50, and other major Indian indices. Real-time updates 
                on BSE and NSE trading activities.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">IT & Technology</h3>
              <p className="text-dark-600">
                Coverage of India's booming IT sector, IT giants, startups, and technology 
                innovations from Bangalore, Hyderabad, and other tech hubs.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of RBI policies, GDP growth, inflation, trade agreements, 
                and economic reforms affecting businesses.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Startups</h3>
              <p className="text-dark-600">
                News about Indian startups, funding rounds, unicorns, and the growing 
                entrepreneurial ecosystem across the country.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About Indian Business</h2>
            <p className="text-dark-700 mb-4">
              India is one of the world's fastest-growing major economies, with a GDP of over 
              $3.5 trillion. The country has emerged as a global business hub, particularly in 
              information technology, pharmaceuticals, manufacturing, and financial services.
            </p>
            <p className="text-dark-700 mb-4">
              Mumbai, known as the financial capital of India, is home to the Bombay Stock 
              Exchange (BSE), the oldest stock exchange in Asia. Bangalore, often called the 
              Silicon Valley of India, leads the country's technology and startup ecosystem. 
              Other major business centers include Delhi-NCR, Chennai, Hyderabad, and Kolkata.
            </p>
            <p className="text-dark-700 mb-4">
              With a young workforce, growing middle class, and increasing digital adoption, 
              India offers tremendous opportunities for businesses and investors. Our coverage 
              includes comprehensive analysis of market trends, policy changes, and corporate 
              developments across all sectors of the Indian economy.
            </p>
            <p className="text-dark-700">
              BusinessHungama brings you complete coverage of Indian business news, from 
              stock market movements to startup funding, from corporate earnings to 
              government policies that shape the nation's economic landscape.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
