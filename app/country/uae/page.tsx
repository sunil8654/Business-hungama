"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function UAAPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=60"
        title="United Arab Emirates"
        subtitle="Latest business news and updates from UAE"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Business News from United Arab Emirates</h1>
          <p className="text-lg text-dark-600 mb-8">
            Stay updated with the latest business news, market updates, and economic 
            developments from the UAE. From Dubai's skyscrapers to Abu Dhabi's investments, 
            we cover all major business stories from the Gulf region.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Real Estate</h3>
              <p className="text-dark-600">
                Coverage of Dubai and Abu Dhabi property markets, mega-projects, 
                and investment opportunities in UAE real estate.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Finance & Banking</h3>
              <p className="text-dark-600">
                News about Dubai International Financial Centre, banking sector, 
                fintech growth, and investment opportunities.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Tourism & Aviation</h3>
              <p className="text-dark-600">
                Updates on Emirates, Etihad, Dubai airports, tourism sector, 
                and hospitality industry developments.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Economy</h3>
              <p className="text-dark-600">
                Analysis of UAE economic diversification, post-oil initiatives, 
                trade, and business regulations.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About UAE Business</h2>
            <p className="text-dark-700 mb-4">
              The United Arab Emirates has emerged as a major business hub in the Middle East, 
              with a GDP of over $500 billion. The country, particularly Dubai and Abu Dhabi, 
              is known for its vision, modern infrastructure, and business-friendly policies.
            </p>
            <p className="text-dark-700 mb-4">
              Dubai has positioned itself as a global center for trade, tourism, aviation, 
              and financial services. Abu Dhabi, the capital, is the wealthiest emirate 
              and a major investor globally. The UAE has successfully diversified its 
              economy beyond oil to include tourism, real estate, finance, and technology.
            </p>
            <p className="text-dark-700 mb-4">
              The country hosts numerous international business conferences, exhibitions, 
              and events throughout the year. Free zones like Dubai International 
              Financial Centre (DIFC) and Dubai Multi Commodities Centre (DMCC) 
              offer attractive incentives for businesses.
            </p>
            <p className="text-dark-700">
              BusinessHungama provides comprehensive coverage of UAE business news, 
              including real estate market updates, corporate announcements, economic 
              analysis, and insights into the growing startup ecosystem in Dubai and Abu Dhabi.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
