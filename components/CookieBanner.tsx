'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function CookieBanner() {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('pixelgamez_cookie_consent');
    if (storedConsent === 'granted' || storedConsent === 'denied') {
      setConsent(storedConsent as 'granted' | 'denied');
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pixelgamez_cookie_consent', 'granted');
    setConsent('granted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('pixelgamez_cookie_consent', 'denied');
    setConsent('denied');
    setShowBanner(false);
  };

  return (
    <>
      {/* Conditionally load GTM based on consent */}
      {consent === 'granted' && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P3R9BX7H');
          `}
        </Script>
      )}

      {showBanner && (
        <div className="cookie-banner-overlay">
          <div className="cookie-banner">
            <div className="cookie-banner-content">
              <h3>We value your privacy</h3>
              <p>
                We use strictly necessary cookies to keep you logged in. With your permission, we also use tracking cookies to analyze traffic and personalize ads. You can choose to accept or reject non-essential cookies.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="btn-reject" onClick={handleReject}>Reject Non-Essential</button>
              <button className="btn-accept" onClick={handleAccept}>Accept All</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
