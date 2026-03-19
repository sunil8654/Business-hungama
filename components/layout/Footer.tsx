import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white mt-20">
        <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold font-display">
              <span className="text-primary">Business</span><span className="text-white">Hungama</span>
            </Link>
            <p className="mt-4 text-dark-400 text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of events that matter.
            </p>
            <div className="mt-4 text-sm text-dark-400 space-y-2">
              <p className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4 text-dark-300" />
                <span>info@BusinessHungama.com</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-dark-300" />
                <span>+91 84680 08465</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 text-dark-300 mt-0.5" />
                <span>
                  B Tower 937
                  <br />
                  Ithum Noida Sector 62
                </span>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                  <Link href="/business" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Business
                </Link>
              </li>
              <li>
                  <Link href="/share-market" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Share Market
                </Link>
              </li>
              <li>
                  <Link href="/startup" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Startup
                </Link>
              </li>
              <li>
                  <Link href="/bollywood" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Bollywood
                </Link>
              </li>
              <li>
                  <Link href="/technology" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Technology
                </Link>
              </li>
              <li>
                  <Link href="/economy" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Economy
                </Link>
              </li>
              <li>
                  <Link href="/sports" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Sports
                </Link>
              </li>
              <li>
                  <Link href="/world" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  World
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Countries</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/country/usa" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  United States
                </Link>
              </li>
              <li>
                <Link href="/country/india" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  India
                </Link>
              </li>
              <li>
                <Link href="/country/uk" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/country/china" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  China
                </Link>
              </li>
              <li>
                <Link href="/country/uae" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  UAE
                </Link>
              </li>
              <li>
                <Link href="/country/australia" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Australia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/company/about-us" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/company/contact" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/company/careers" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/company/advertise" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/company/press" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/company/editorial-policy" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/company/code-of-ethics" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Code of Ethics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/company/terms-of-service" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/company/privacy-policy" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/company/cookie-policy" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/company/disclaimer" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/company/accessibility" className="text-dark-400 hover:text-primary transition-colors text-sm">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            (c) {new Date().getFullYear()} BusinessHungama. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-dark-500">
            <span>Designed with care for readers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

