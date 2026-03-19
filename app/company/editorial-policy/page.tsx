"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { ShieldCheckIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=60"
        title="Editorial Policy"
        subtitle="Our commitment to journalistic excellence"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Editorial Policy</h1>
          <p className="text-lg text-dark-600 mb-8">
            At BusinessHungama, we are committed to the highest standards of journalism. 
            This editorial policy outlines our principles and practices for producing 
            accurate, fair, and trustworthy content.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Accuracy</h2>
                <p className="text-dark-700">
                  We strive for accuracy in all our reporting. All facts are verified before 
                  publication. We cite sources and provide context to help readers understand 
                  the reliability of our information. When we make mistakes, we correct them 
                  promptly and transparently.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <DocumentMagnifyingGlassIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Fairness</h2>
                <p className="text-dark-700">
                  We present all sides of a story fairly. Our journalists seek diverse 
                  perspectives and give individuals and organizations the opportunity to 
                  respond to allegations before publication. We avoid stereotyping and 
                  treat all sources with respect.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <PencilSquareIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Independence</h2>
                <p className="text-dark-700">
                  BusinessHungama maintains editorial independence from advertisers, 
                  sponsors, and external influences. Our editorial decisions are based 
                  solely on news value and reader interest. We clearly distinguish between 
                  news content and sponsored/paid content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <ExclamationTriangleIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Corrections Policy</h2>
                <p className="text-dark-700">
                  We take corrections seriously. When errors are identified, we publish a 
                  clear correction noting what was wrong and what is correct. Minor errors 
                  are corrected inline; significant errors result in a formal correction 
                  at the top of the article.
                </p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Source Verification</h2>
            <p className="text-dark-700 mb-4">
              We verify information from multiple sources whenever possible. For breaking 
              news, we prioritize official sources such as company announcements, government 
              statements, and official communications. We are cautious about anonymous 
              sources and disclose their identity to editors.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Conflict of Interest</h2>
            <p className="text-dark-700 mb-4">
              Our journalists must avoid conflicts of interest that could compromise their 
              reporting. They cannot accept gifts, favors, or free travel from news sources. 
              Any potential conflicts must be disclosed to editors. Our staff members do not 
              trade in securities based on information they gather through their work.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Sponsored Content</h2>
            <p className="text-dark-700 mb-4">
              Sponsored or paid content is clearly labeled as such. This content goes through 
              a separate review process to ensure it meets advertising standards while 
              maintaining transparency with our readers.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Feedback</h2>
            <p className="text-dark-700">
              We value feedback from our readers. If you believe we have made an error 
              or have concerns about our coverage, please contact us at 
              <span className="text-primary"> editorial@businesshungama.com</span>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
