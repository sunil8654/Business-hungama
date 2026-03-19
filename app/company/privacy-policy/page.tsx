"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { ShieldCheckIcon, EyeSlashIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=60"
        title="Privacy Policy"
        subtitle="How we protect and handle your data"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <p className="text-dark-600 mb-8">Last updated: March 2026</p>
          
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">1. Introduction</h2>
              </div>
              <p className="text-dark-700">
                At BusinessHungama, we take your privacy seriously. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <EyeSlashIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              </div>
              <p className="text-dark-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>Register on the Website</li>
                <li>Subscribe to our newsletter</li>
                <li>Fill out a contact form</li>
                <li>Comment on articles</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-dark-700 mt-4">
                The personal information we collect may include your name, email address, phone number, and other contact information.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <UserIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              </div>
              <p className="text-dark-700 mb-4">
                We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested</li>
                <li>To improve our website in order to better serve you</li>
                <li>To allow us to better service you in responding to your customer service requests</li>
                <li>To send periodic emails regarding your order or other products and services</li>
                <li>To follow up with them after correspondence (live chat, email or phone inquiries)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-dark-700 mb-4">
                We may use cookies, web beacons, and other tracking technologies to help customize our Website and improve your experience. When you access our Website, your personal information is not collected through the use of tracking technologies.
              </p>
              <p className="text-dark-700">
                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Disclosure</h2>
              <p className="text-dark-700">
                We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="text-dark-700">
                We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our payment gateway providers database.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <BellIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">7. Your Rights</h2>
              </div>
              <p className="text-dark-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of any inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-dark-700">
                Our Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-dark-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-dark-700">
                If you have any questions about this Privacy Policy, please contact us at <span className="text-primary">privacy@businesshungama.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
