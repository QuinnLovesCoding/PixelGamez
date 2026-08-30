import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AuthProvider } from '../components/AuthContext';
import { ThemeProvider } from '../components/ThemeContext';
import { I18nProvider } from '../components/I18nContext';
import AuthModal from '../components/AuthModal';
import NotificationSystem from '../components/NotificationSystem';
import { GoogleOAuthProvider } from '@react-oauth/google';
import JsonLd from '../components/JsonLd';
import CookieBanner from '../components/CookieBanner';

export const metadata: Metadata = {
  title: 'PixelGamez — Free Online Games',
  description: 'Play free online games at PixelGamez. Browse hundreds of high-quality browser games across action, puzzle, racing, and more.',
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

import { getAllGames } from '../lib/server-data';
import GamesProvider from './GamesProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PixelGamez",
    "url": "https://www.pixelgamez.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.pixelgamez.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PixelGamez",
    "url": "https://www.pixelgamez.com/",
    "logo": "https://www.pixelgamez.com/images/logo/PixelGamezLogoNoBackround.png",
    "sameAs": [
      "https://twitter.com/pixelgamez",
      "https://www.facebook.com/pixelgamez",
      "https://www.youtube.com/c/pixelgamez"
    ]
  };

  const allGames = await getAllGames();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/PixelGamezLogoNoBackround.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo/PixelGamezLogoNoBackround.png" />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body suppressHydrationWarning>
        <GoogleOAuthProvider clientId="802247549330-j6l3kkqehqedcl7bsgpduro1hihqpc1o.apps.googleusercontent.com">
          <GamesProvider initialGames={allGames as any}>
            <I18nProvider>
              <AuthProvider>
              <ThemeProvider>
                <div id="app">
                  <div id="app-header">
                    <Header />
                  </div>
                  <div id="app-sidebar">
                    <Sidebar />
                  </div>
                  <main id="app-main">
                    <div id="app-content">
                      {children}
                    </div>
                  </main>
                </div>
                <AuthModal />
                <NotificationSystem />
                <CookieBanner />
              </ThemeProvider>
              </AuthProvider>
            </I18nProvider>
          </GamesProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
