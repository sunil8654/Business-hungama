"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { ScaleIcon, EyeIcon, HeartIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function CodeOfEthicsPage() {
  const principles = [
    {
      title: 'Truth and Accuracy',
      description: 'We are committed to the truth. We verify all facts before publication and strive for accuracy in every story. We correct errors promptly and transparently.',
      icon: <LightBulbIcon className="w-8 h-8" />,
    },
    {
      title: 'Independence',
      description: 'We maintain editorial independence from all external influences, including advertisers, sponsors, and political interests. Our coverage is driven solely by news value.',
      icon: <ScaleIcon className="w-8 h-8" />,
    },
    {
      title: 'Fairness',
      description: 'We treat all individuals and organizations fairly. We give people the opportunity to respond to allegations and present multiple perspectives on every issue.',
      icon: <EyeIcon className="w-8 h-8" />,
    },
    {
      title: 'Respect',
      description: 'We treat all people with dignity and respect. We avoid stereotyping, discrimination, and unnecessary intrusion into people\'s private lives.',
      icon: <HeartIcon className="w-8 h-8" />,
    },
    {
      title: 'Accountability',
      description: 'We are accountable to our readers. We welcome feedback, acknowledge mistakes, and take responsibility for our journalism.',
      icon: <UserGroupIcon className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=60"
        title="Code of Ethics"
        subtitle="Our commitment to integrity in journalism"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Code of Ethics</h1>
          <p className="text-lg text-dark-600 mb-8">
            At BusinessHungama, we uphold the highest standards of integrity, fairness, 
            and accountability in all our journalism. This code of ethics guides our 
            decisions and behavior as we serve our readers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {principles.map((principle, index) => (
              <div key={index} className="p-6 bg-dark-50 dark:bg-dark-800 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                <p className="text-dark-600">{principle.description}</p>
              </div>
            ))}
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">1. Public Interest</h3>
            <p className="text-dark-700 mb-4">
              Our primary duty is to serve the public interest. We cover stories that matter 
              to our readers and provide information they need to make informed decisions 
              about business, finance, and their communities.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Transparency</h3>
            <p className="text-dark-700 mb-4">
              We are transparent about our sources, methods, and any potential conflicts 
              of interest. When we're unable to verify information, we say so. We clearly 
              label sponsored content and distinguish it from editorial content.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Independence</h3>
            <p className="text-dark-700 mb-4">
              We are independent from governments, corporations, political parties, and 
              other special interests. Our journalists do not accept gifts, favors, or 
              benefits that could influence their reporting.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4. Minimizing Harm</h3>
            <p className="text-dark-700 mb-4">
              We balance the public's right to know with potential harm to individuals. 
              We consider the impact of our reporting on sources, subjects, and innocent 
              parties. We anonymize sources when necessary to protect their safety.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5. Professional Development</h3>
            <p className="text-dark-700 mb-4">
              We invest in the ongoing training and development of our journalists. We 
              encourage our team to stay current with industry best practices and emerging 
              technologies in journalism.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Our Commitment</h2>
            <p className="text-dark-700 mb-4">
              This code of ethics is not merely a set of rules—it reflects who we are and 
              what we stand for. We are committed to maintaining the trust of our readers 
              by adhering to these principles in everything we do.
            </p>
            <p className="text-dark-700">
              Questions about our ethics? Contact us at 
              <span className="text-primary"> editorial@businesshungama.com</span>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
