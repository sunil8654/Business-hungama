"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { EnvelopeIcon, PhoneIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function PressPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=60"
        title="Press Room"
        subtitle="Media resources and press contacts"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Press Room</h1>
          <p className="text-lg text-dark-600 mb-8">
            Welcome to the BusinessHungama press room. Here you'll find press releases, 
            media resources, and contact information for media inquiries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <EnvelopeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
              <p className="text-dark-600 mb-4">For all media-related questions, interviews, and press information.</p>
              <p className="text-primary font-medium">media@businesshungama.com</p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Press Phone</h3>
              <p className="text-dark-600 mb-4">Available for urgent media inquiries during business hours.</p>
              <p className="text-primary font-medium">+91 84680 08465</p>
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">For Media Outlets</h2>
            <p className="text-dark-700 mb-4">
              BusinessHungama welcomes inquiries from media outlets, journalists, and content 
              creators. Whether you're looking for expert commentary, data for your business 
              stories, or partnership opportunities, we're here to help.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Press Releases</h3>
            <p className="text-dark-700 mb-4">
              To submit a press release for consideration, please email 
              <span className="text-primary"> press@businesshungama.com</span>. We review all 
              submissions and feature newsworthy announcements on our platform.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Expert Commentary</h3>
            <p className="text-dark-700 mb-4">
              Our team of analysts and subject matter experts are available for interviews 
              and commentary on business, finance, technology, and market trends. Please 
              contact our media team with your requirements and timeline.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Brand Assets</h3>
            <p className="text-dark-700 mb-4">
              Members of the media can request our brand assets, including logos, executive 
              photos, and corporate information. Please specify your publication and intended 
              use when making your request.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Recent Press Coverage</h2>
            <div className="space-y-4">
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <p className="text-dark-600 text-sm mb-2">The Economic Times</p>
                <p className="font-medium">"BusinessHungama emerges as India's fastest-growing business news platform"</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <p className="text-dark-600 text-sm mb-2">Mint</p>
                <p className="font-medium">"How BusinessHungama is revolutionizing digital business journalism"</p>
              </div>
              <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <p className="text-dark-600 text-sm mb-2">Financial Express</p>
                <p className="font-medium">"BusinessHungama crosses 10 million monthly readers milestone"</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
