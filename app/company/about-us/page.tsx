"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60"
        title="About BusinessHungama"
        subtitle="Your trusted source for business news"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About BusinessHungama</h1>
          <p className="text-lg text-dark-600 mb-8">
            BusinessHungama is a leading digital news platform dedicated to delivering accurate, 
            timely, and comprehensive business news coverage from across India and around the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-dark-600">Monthly Readers</div>
            </div>
            <div className="text-center p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-dark-600">Daily News Articles</div>
            </div>
            <div className="text-center p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-dark-600">Countries Covered</div>
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-dark-700 mb-4">
              At BusinessHungama, our mission is to empower businesses, investors, entrepreneurs, 
              and professionals with reliable information and actionable insights. We believe 
              that access to accurate, timely, and comprehensive business news is essential 
              for making informed decisions in today's fast-paced global economy.
            </p>
            <p className="text-dark-700 mb-4">
              We are committed to journalistic integrity, accuracy, and fairness in all our 
              reporting. Our team of experienced journalists, editors, and analysts work 
              around the clock to bring you the latest news, in-depth analysis, and expert 
              insights from the world of business, finance, technology, and markets.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">Stock Markets</h3>
                <p className="text-dark-600 text-sm">Real-time updates from BSE, NSE, NYSE, NASDAQ, and global exchanges.</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">Economy</h3>
                <p className="text-dark-600 text-sm">Analysis of monetary policies, GDP, inflation, and economic trends.</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">Technology</h3>
                <p className="text-dark-600 text-sm">Coverage of startups, tech giants, innovations, and digital transformation.</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">Corporate News</h3>
                <p className="text-dark-600 text-sm">Mergers, acquisitions, earnings, and corporate developments.</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">International Business</h3>
                <p className="text-dark-600 text-sm">Global trade, investments, and business relations between nations.</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <h3 className="font-semibold mb-2">Personal Finance</h3>
                <p className="text-dark-600 text-sm">Investment tips, tax planning, and wealth management advice.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">Our Values</h2>
            <ul className="list-disc pl-6 text-dark-700 space-y-2 mb-6">
              <li><strong>Integrity:</strong> We adhere to the highest standards of journalistic ethics.</li>
              <li><strong>Accuracy:</strong> We verify all facts before publishing any news.</li>
              <li><strong>Objectivity:</strong> We present news without bias, allowing readers to form their own opinions.</li>
              <li><strong>Timeliness:</strong> We deliver breaking news as it happens.</li>
              <li><strong>Innovation:</strong> We continuously improve our platform to serve our readers better.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Join Our Journey</h2>
            <p className="text-dark-700 mb-4">
              Whether you're a seasoned investor, a budding entrepreneur, or simply interested in 
              staying informed about the business world, BusinessHungama is your trusted companion. 
              Subscribe to our newsletter, follow us on social media, and stay ahead with the 
              latest business news and insights.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
