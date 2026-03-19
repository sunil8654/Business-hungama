"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { DocumentTextIcon, CogIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=60"
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <p className="text-dark-600 mb-8">Last updated: March 2026</p>
          
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">1. What Are Cookies</h2>
              </div>
              <p className="text-dark-700">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
              <p className="text-dark-700 mb-4">
                BusinessHungama uses cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
              
              <div className="space-y-4 mt-6">
                <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Essential Cookies</h3>
                  <p className="text-dark-600 text-sm">
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you, such as logging in or filling in forms.
                  </p>
                </div>
                
                <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Performance Cookies</h3>
                  <p className="text-dark-600 text-sm">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.
                  </p>
                </div>
                
                <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Functionality Cookies</h3>
                  <p className="text-dark-600 text-sm">
                    These cookies enable enhanced functionality and personalization, such as videos and live chat. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
                
                <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Targeting Cookies</h3>
                  <p className="text-dark-600 text-sm">
                    These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CogIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">4. Managing Cookies</h2>
              </div>
              <p className="text-dark-700 mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
              <p className="text-dark-700">
                To manage cookies, you can:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2 mt-4">
                <li>Use your browser settings to delete existing cookies</li>
                <li>Set your browser to block cookies</li>
                <li>Set your browser to notify you when a cookie is set</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <TrashIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">5. Cookie List</h2>
              </div>
              <p className="text-dark-700 mb-4">
                Below is a list of the main cookies we use:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-200 dark:border-dark-700">
                      <th className="text-left py-3 pr-4">Cookie Name</th>
                      <th className="text-left py-3 pr-4">Type</th>
                      <th className="text-left py-3">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-700">
                    <tr className="border-b border-dark-100 dark:border-dark-800">
                      <td className="py-3 pr-4">session_id</td>
                      <td className="py-3 pr-4">Essential</td>
                      <td className="py-3">Maintain your session</td>
                    </tr>
                    <tr className="border-b border-dark-100 dark:border-dark-800">
                      <td className="py-3 pr-4">auth_token</td>
                      <td className="py-3 pr-4">Essential</td>
                      <td className="py-3">User authentication</td>
                    </tr>
                    <tr className="border-b border-dark-100 dark:border-dark-800">
                      <td className="py-3 pr-4">_ga</td>
                      <td className="py-3 pr-4">Analytics</td>
                      <td className="py-3">Google Analytics tracking</td>
                    </tr>
                    <tr className="border-b border-dark-100 dark:border-dark-800">
                      <td className="py-3 pr-4">preferences</td>
                      <td className="py-3 pr-4">Functional</td>
                      <td className="py-3">Store user preferences</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Third-Party Cookies</h2>
              <p className="text-dark-700">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. We recommend you check the third-party websites for more information about their cookies and how to manage them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Updates to This Policy</h2>
              <p className="text-dark-700">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will post any changes on this page and update the "last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-dark-700">
                If you have any questions about our use of cookies, please contact us at <span className="text-primary">privacy@businesshungama.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
