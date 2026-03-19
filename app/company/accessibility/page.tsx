"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { GlobeAltIcon, DevicePhoneMobileIcon, EyeIcon, CommandLineIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1600&q=60"
        title="Accessibility"
        subtitle="Our commitment to an inclusive web experience"
        height="400px"
      />
      <main className="container-custom py-16">
        <div className="max-w-4xl">
          <p className="text-dark-600 mb-8">Last updated: March 2026</p>
          
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <GlobeAltIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">1. Our Commitment</h2>
              </div>
              <p className="text-dark-700">
                BusinessHungama is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee we provide equal access to all users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Conformance Status</h2>
              <p className="text-dark-700 mb-4">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
              </p>
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✓ This website has been designed with accessibility in mind, following WCAG 2.1 Level AA guidelines.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <DevicePhoneMobileIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">3. Responsive Design</h2>
              </div>
              <p className="text-dark-700">
                Our website is designed to be responsive and accessible on various devices, including desktops, tablets, and mobile phones. The layout adapts to different screen sizes while maintaining accessibility features.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <EyeIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">4. Accessibility Features</h2>
              </div>
              <p className="text-dark-700 mb-4">
                Our website includes the following accessibility features:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                  <p className="text-dark-600 text-sm">All interactive elements can be accessed using keyboard shortcuts</p>
                </div>
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Alt Text</h3>
                  <p className="text-dark-600 text-sm">All images have descriptive alternative text</p>
                </div>
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Color Contrast</h3>
                  <p className="text-dark-600 text-sm">Sufficient color contrast ratios for readability</p>
                </div>
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Focus Indicators</h3>
                  <p className="text-dark-600 text-sm">Clear focus indicators for interactive elements</p>
                </div>
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Scalable Text</h3>
                  <p className="text-dark-600 text-sm">Text can be resized without loss of content</p>
                </div>
                <div className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                  <h3 className="font-semibold mb-2">Screen Reader Support</h3>
                  <p className="text-dark-600 text-sm">Compatible with popular screen readers</p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <CommandLineIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">5. Keyboard Shortcuts</h2>
              </div>
              <p className="text-dark-700 mb-4">
                Our website supports standard keyboard navigation. You can use:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li><strong>Tab:</strong> Move to next interactive element</li>
                <li><strong>Shift + Tab:</strong> Move to previous element</li>
                <li><strong>Enter/Space:</strong> Activate buttons and links</li>
                <li><strong>Escape:</strong> Close modals and menus</li>
                <li><strong>Arrow Keys:</strong> Navigate within menus and content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Browser Compatibility</h2>
              <p className="text-dark-700">
                Our website is designed to work with the latest versions of major browsers, including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend keeping your browser updated.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <HandRaisedIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">7. Assistive Technology Support</h2>
              </div>
              <p className="text-dark-700 mb-4">
                Our website is compatible with various assistive technologies, including:
              </p>
              <ul className="list-disc pl-6 text-dark-700 space-y-2">
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Screen magnification software</li>
                <li>Voice recognition software</li>
                <li>Switch control devices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. PDF Accessibility</h2>
              <p className="text-dark-700">
                We strive to ensure that any PDF documents we publish are accessible. If you encounter any accessibility issues with our PDFs, please contact us, and we will work to provide an accessible alternative.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Reporting Accessibility Issues</h2>
              <p className="text-dark-700 mb-4">
                If you experience any accessibility barriers or have suggestions for improvement, please let us know. We welcome your feedback.
              </p>
              <p className="text-dark-700">
                Contact us at: <span className="text-primary">accessibility@businesshungama.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Continuous Improvement</h2>
              <p className="text-dark-700">
                Accessibility is an ongoing process. We regularly review and improve our website to ensure it remains accessible to all users. We also train our staff on web accessibility to maintain our standards.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
