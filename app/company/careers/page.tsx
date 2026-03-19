"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60"
        title="Careers at BusinessHungama"
        subtitle="Join our team of talented professionals"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h1>
          <p className="text-lg text-dark-600 mb-8">
            We're always looking for talented individuals who share our passion for business 
            journalism and digital innovation. Explore our current openings and find your 
            next career opportunity at BusinessHungama.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Work with Impact</h3>
              <p className="text-dark-600">
                Reach millions of readers and influence business decisions across the globe.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
              <p className="text-dark-600">
                Continuous learning, skill development, and career advancement in a dynamic environment.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
              <p className="text-dark-600">
                Flexible work arrangements, remote options, and generous leave policies.
              </p>
            </div>
            <div className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
              <p className="text-dark-600">
                Health insurance, performance bonuses, and comprehensive employee benefits.
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Why BusinessHungama?</h2>
            <p className="text-dark-700 mb-4">
              At BusinessHungama, we believe in fostering a culture of excellence, innovation, 
              and collaboration. Our team members are our greatest asset, and we invest in 
              their growth and well-being. When you join us, you become part of a mission 
              that's transforming how business news is consumed in India and beyond.
            </p>
            <p className="text-dark-700">
              Don't see a suitable opening? We're always interested in hearing from talented 
              individuals. Send your resume to <span className="text-primary">careers@businesshungama.com</span> 
              and we'll keep you in mind for future opportunities.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
