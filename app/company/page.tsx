"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/ui/Hero';
import Footer from '@/components/layout/Footer';
import { InformationCircleIcon, EnvelopeIcon, MegaphoneIcon, DocumentTextIcon, ShieldCheckIcon, ScaleIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function CompanyIndexPage() {
  const sections = [
    { 
      href: '/company/about-us', 
      label: 'About Us', 
      icon: <InformationCircleIcon className="w-8 h-8" />,
      description: 'Learn about our mission, vision, and team'
    },
    { 
      href: '/company/contact', 
      label: 'Contact', 
      icon: <EnvelopeIcon className="w-8 h-8" />,
      description: 'Get in touch with our team'
    },
    { 
      href: '/company/advertise', 
      label: 'Advertise', 
      icon: <MegaphoneIcon className="w-8 h-8" />,
      description: 'Partner with us to reach millions'
    },
    { 
      href: '/company/press', 
      label: 'Press', 
      icon: <DocumentTextIcon className="w-8 h-8" />,
      description: 'Media resources and press contacts'
    },
    { 
      href: '/company/editorial-policy', 
      label: 'Editorial Policy', 
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      description: 'Our editorial standards and practices'
    },
    { 
      href: '/company/code-of-ethics', 
      label: 'Code of Ethics', 
      icon: <ScaleIcon className="w-8 h-8" />,
      description: 'Our commitment to integrity'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=60"
        title="About BusinessHungama"
        subtitle="Your trusted source for business news"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Company</h1>
          <p className="text-lg text-dark-600 mb-12 text-center max-w-2xl mx-auto">
            Welcome to BusinessHungama. Explore our company information, learn about our 
            mission, and discover how we deliver trusted business news to millions of readers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((s) => (
              <Link 
                key={s.href} 
                href={s.href} 
                className="p-6 border border-dark-200 dark:border-dark-700 rounded-xl hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h2 className="text-lg font-bold mb-2">{s.label}</h2>
                <p className="text-dark-600 text-sm">{s.description}</p>
              </Link>
            ))}
          </div>

          <div className="bg-dark-50 dark:bg-dark-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-dark-700 mb-4">
              At BusinessHungama, our mission is to empower businesses, investors, and professionals 
              with reliable information and actionable insights. We believe that access to 
              accurate, timely, and comprehensive business news is essential for making 
              informed decisions in today's fast-paced global economy.
            </p>
            <p className="text-dark-700">
              With a team of experienced journalists, editors, and analysts, we work around 
              the clock to bring you the latest news, in-depth analysis, and expert 
              insights from the world of business, finance, technology, and markets.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
