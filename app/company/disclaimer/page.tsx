"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { ExclamationTriangleIcon, ChartBarIcon, NewspaperIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=60"
        title="Disclaimer"
        subtitle="Important information about our content"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <p className="text-dark-600 mb-8">Last updated: March 2026</p>
          
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">1. General Information</h2>
              </div>
              <p className="text-dark-700">
                The information provided on BusinessHungama is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <ArrowTrendingUpIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">2. Financial Information</h2>
              </div>
              <p className="text-dark-700 mb-4">
                BusinessHungama may contain financial information, stock market data, business news, and investment-related content. This information is provided for educational and informational purposes only and should NOT be construed as financial advice.
              </p>
              <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  ⚠️ Important: Stock market and financial investments involve risk. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making any investment decisions.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <ArrowTrendingUpIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">3. Stock Market Data</h2>
              </div>
              <p className="text-dark-700 mb-4">
                Any stock market data, quotes, charts, and financial information displayed on BusinessHungama is:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>Provided for informational purposes only</li>
                <li>Subject to delays and may not be real-time</li>
                <li>Not guaranteed for accuracy or completeness</li>
                <li>May be delayed by 15 minutes or more</li>
              </ul>
              <p className="text-dark-700 mt-4">
                We are not responsible for any trading decisions or losses resulting from reliance on the financial information provided on this website.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <NewspaperIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">4. News Content</h2>
              </div>
              <p className="text-dark-700 mb-4">
                News articles and other content on BusinessHungama are based on information from various sources. While we strive to verify facts and provide accurate reporting, we cannot guarantee that all information is completely accurate, current, or complete.
              </p>
              <p className="text-dark-700">
                News is inherently subject to change as events unfold. We encourage readers to verify information from multiple sources and to check the date of publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. External Links</h2>
              <p className="text-dark-700 mb-4">
                Our website may contain links to external websites that are not provided or maintained by BusinessHungama. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. No Professional Advice</h2>
              <p className="text-dark-700">
                The content on BusinessHungama is not intended to be professional advice of any kind, including but not limited to financial, legal, medical, or tax advice. You should seek professional advice for your specific situation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. User-Generated Content</h2>
              <p className="text-dark-700 mb-4">
                Comments, opinions, and user-generated content on BusinessHungama are those of the respective authors and do not necessarily reflect our views or opinions. We are not responsible for any user-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Errors and Omissions</h2>
              <p className="text-dark-700">
                While we make every effort to ensure accuracy, there may be typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-dark-700">
                BusinessHungama will not be liable for any losses or damages arising out of or in connection with the use of our website, including but not limited to indirect, incidental, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Disclaimer</h2>
              <p className="text-dark-700">
                We reserve the right to modify this disclaimer at any time. Any changes will be effective immediately upon posting on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-dark-700">
                If you have any questions about this Disclaimer, please contact us at <span className="text-primary">legal@businesshungama.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
