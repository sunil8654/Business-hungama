"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function AustraliaPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1600&q=60"
        title="Australia"
        subtitle="Latest business news and updates from Australia"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from Australia</h1>
          <p className="text-lg text-dark-600 mb-8">
            Get the latest business news, market updates, and economic developments from Australia. 
            From Sydney's financial district to Melbourne's business hubs, we cover all major 
            business stories from down under.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Stock Markets</h3>
              <p className="text-dark-600">
                Track ASX 200 and other Australian indices. Real-time updates on 
                Australian Securities Exchange trading activities.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Mining & Resources</h3>
              <p className="text-dark-600">
                Coverage of Australia's mining sector, commodity prices, major miners, 
                and resource exploration news.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of RBA policies, GDP growth, inflation, trade, and economic 
                indicators affecting Australian businesses.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Finance & Tech</h3>
              <p className="text-dark-600">
                News about banking sector, fintech innovations, startup ecosystem, 
                and Sydney-Melbourne business corridor.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About Australian Business</h2>
            <p className="text-dark-700 mb-4">
              Australia is the world's 13th largest economy with a GDP of over $1.7 trillion. 
              The country is known for its stable economy, strong financial sector, and 
              abundant natural resources. Major business centers include Sydney, Melbourne, 
              Brisbane, and Perth.
            </p>
            <p className="text-dark-700 mb-4">
              Sydney is the financial capital of Australia, home to the Australian Securities 
              Exchange (ASX) and major banking institutions. Melbourne is known for its 
              diverse economy, manufacturing, and growing tech scene. The country is one 
              of the world's largest exporters of minerals and agricultural products.
            </p>
            <p className="text-dark-700 mb-4">
              Australia's economy has benefited from its proximity to Asia, strong trade 
              relationships with China and other regional powers, and progressive business 
              policies. The country has also seen growth in technology, renewable energy, 
              and services sectors.
            </p>
            <p className="text-dark-700">
              BusinessHungama brings you comprehensive coverage of Australian business news, 
              from stock market updates to mining sector developments, corporate earnings 
              to economic analysis, keeping you informed about all business developments 
              in the Land Down Under.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
