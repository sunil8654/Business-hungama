"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=60"
        title="Terms of Service"
        subtitle="Terms and conditions for using BusinessHungama"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <p className="text-dark-600 mb-4">Last updated: March 2026</p>
          
          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-dark-700">
                By accessing and using BusinessHungama, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-dark-700 mb-4">
                Permission is granted to temporarily use BusinessHungama for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Transfer the materials to another person or entity</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Account</h2>
              <p className="text-dark-700">
                When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Content Submission</h2>
              <p className="text-dark-700">
                By submitting content to BusinessHungama, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content. You represent and warrant that you own or have the necessary rights to submit such content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
              <p className="text-dark-700">
                The materials on BusinessHungama are provided on an 'as is' basis. BusinessHungama makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-dark-700">
                In no event shall BusinessHungama or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website, even if BusinessHungama has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
              <p className="text-dark-700">
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="text-dark-700">
                BusinessHungama reserves the right to revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-dark-700">
                If you have any questions about these Terms of Service, please contact us at <span className="text-primary">legal@businesshungama.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
