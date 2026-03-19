"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function ChinaPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=60"
        title="China"
        subtitle="Latest business news and updates from China"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from China</h1>
          <p className="text-lg text-dark-600 mb-8">
            Get the latest business news, market updates, and economic developments from China. 
            From Shanghai's financial district to Shenzhen's tech hubs, we cover all major 
            business stories from the world's second-largest economy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Stock Markets</h3>
              <p className="text-dark-600">
                Track Shanghai Composite, Shenzhen Component, and other Chinese indices. 
                Real-time updates on SSE and SZSE trading.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Trade & Exports</h3>
              <p className="text-dark-600">
                Coverage of China's international trade, exports, imports, and trade 
                policies affecting global supply chains.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Technology</h3>
              <p className="text-dark-600">
                News about Chinese tech giants, AI developments, EV manufacturers, 
                and innovation in Shenzhen and other tech hubs.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of Chinese economic policies, GDP growth, industrial output, 
                and economic reforms.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About Chinese Business</h2>
            <p className="text-dark-700 mb-4">
              China is the world's second-largest economy with a GDP of over $17 trillion. 
              The country has transformed from a manufacturing hub to a leader in 
              technology, innovation, and digital commerce. Major business centers 
              include Shanghai, Beijing, Shenzhen, and Guangzhou.
            </p>
            <p className="text-dark-700 mb-4">
              The Chinese stock markets, the Shanghai Stock Exchange (SSE) and Shenzhen 
              Stock Exchange (SZSE), are among the largest in the world by market 
              capitalization. The country is home to some of the world's largest 
              companies in e-commerce, telecommunications, and electric vehicles.
            </p>
            <p className="text-dark-700 mb-4">
              China's Belt and Road Initiative, focus on technological self-sufficiency, 
              and evolving regulatory environment continue to shape its business landscape. 
              The country remains a critical player in global supply chains and international trade.
            </p>
            <p className="text-dark-700">
              BusinessHungama brings you comprehensive coverage of Chinese business news, 
              from stock market movements to corporate developments, trade policies 
              to technological innovations shaping the world's second-largest economy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
