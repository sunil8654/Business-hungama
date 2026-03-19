"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { MegaphoneIcon, GlobeAltIcon, CursorArrowRaysIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function AdvertisePage() {
  const adFormats = [
    {
      title: 'Display Advertising',
      description: 'Banner ads in various sizes across our website and mobile app',
      icon: <MegaphoneIcon className="w-8 h-8" />,
    },
    {
      title: 'Native Advertising',
      description: 'Sponsored content that blends seamlessly with our editorial content',
      icon: <CursorArrowRaysIcon className="w-8 h-8" />,
    },
    {
      title: 'Programmatic Ads',
      description: 'Automated ad buying with targeting capabilities across our network',
      icon: <ChartBarIcon className="w-8 h-8" />,
    },
    {
      title: 'Global Reach',
      description: 'Access to our international audience across 50+ countries',
      icon: <GlobeAltIcon className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=60"
        title="Advertise with BusinessHungama"
        subtitle="Reach millions of business professionals and investors"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Advertising with BusinessHungama</h1>
          <p className="text-lg text-dark-600 mb-8">
            Partner with India's leading business news platform to reach your target audience. 
            With over 10 million monthly readers, BusinessHungama offers unparalleled access 
            to business professionals, investors, entrepreneurs, and decision-makers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {adFormats.map((format, index) => (
              <div key={index} className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {format.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{format.title}</h3>
                <p className="text-dark-600">{format.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-dark-50 dark:bg-dark-800 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Audience</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10M+</div>
                <div className="text-dark-600 text-sm">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5M+</div>
                <div className="text-dark-600 text-sm">Unique Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-dark-600 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8min</div>
                <div className="text-dark-600 text-sm">Avg. Time on Site</div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">Why Advertise With Us?</h2>
            <ul className="list-disc pl-6 text-dark-700 space-y-2 mb-6">
              <li><strong>Targeted Reach:</strong> Reach business professionals based on industry, job function, and location.</li>
              <li><strong>High Engagement:</strong> Our readers are highly engaged and actively seeking business information.</li>
              <li><strong>Brand Safety:</strong> Advertise in a trusted, brand-safe environment with premium content.</li>
              <li><strong>Performance Tracking:</strong> Real-time analytics and detailed reporting on your campaign performance.</li>
              <li><strong>Dedicated Support:</strong> Our advertising team provides personalized support throughout your campaign.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Get Started</h2>
            <p className="text-dark-700 mb-4">
              Ready to reach your target audience? Contact our advertising team today to 
              discuss your marketing objectives and custom advertising solutions.
            </p>
            <p className="text-dark-700">
              Email: <span className="text-primary">advertising@businesshungama.com</span><br />
              Phone: <span className="text-primary">+91 84680 08465</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
