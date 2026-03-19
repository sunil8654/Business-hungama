import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: {
    default: 'BusinessHungama - Breaking News, Latest News and Top Stories',
    template: '%s | BusinessHungama'
  },
  description: 'Get the latest breaking news, top stories, and in-depth analysis from around the world. Premium content available for subscribers.',
  keywords: ['news', 'breaking news', 'latest news', 'politics', 'business', 'technology', 'sports', 'entertainment'],
  authors: [{ name: 'BusinessHungama' }],
  creator: 'BusinessHungama',
  publisher: 'BusinessHungama',
  metadataBase: new URL('https://thenewsminute.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://businesshungama.com',
    siteName: 'BusinessHungama',
    title: 'BusinessHungama - Breaking News, Latest News and Top Stories',
    description: 'Get the latest breaking news, top stories, and in-depth analysis from around the world.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BusinessHungama'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BusinessHungama',
    description: 'Get the latest breaking news, top stories, and in-depth analysis.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <AuthProvider>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0f0f0f',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
