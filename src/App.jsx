import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WelcomeScreen from '@/components/WelcomeScreen';
import PhoneNumberForm from '@/components/PhoneNumberForm';
import VerificationScreen from '@/components/VerificationScreen';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formEventId, setFormEventId] = useState(null);

  // ==========================================
  // PIXELS INITIALIZATION (Meta & TikTok)
  // ==========================================
  useEffect(() => {
    // 1. FACEBOOK PIXEL INITIALIZATION
    if (!window.fbq) {
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Privacy hardening: Disable automatic SPA route tracking
      window.fbq.disablePushState = true;

      // Meta Pixel ID
      window.fbq('init', '1178392937552985');
    }
    // Fire initial PageView for Facebook
    window.fbq('track', 'PageView');

    // 2. TIKTOK PIXEL INITIALIZATION (Vite/React Safe)
    if (typeof window !== 'undefined' && !window.ttq) {
      window.TiktokAnalyticsObject = 'ttq';
      window.ttq = window.ttq || [];
      window.ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      
      window.ttq.setAndDefer = function(t, e) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      
      for (let i = 0; i < window.ttq.methods.length; i++) {
        window.ttq.setAndDefer(window.ttq, window.ttq.methods[i]);
      }
      
      window.ttq.instance = function(t) {
        const e = window.ttq._i[t] || [];
        return e;
      };
      
      window.ttq.load = function(e, n) {
        const i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        window.ttq._i = window.ttq._i || {};
        window.ttq._i[e] = [];
        window.ttq._i[e]._u = i;
        window.ttq._t = window.ttq._t || {};
        window.ttq._t[e] = +new Date();
        window.ttq._o = window.ttq._o || {};
        window.ttq._o[e] = n || {};
        
        const o = document.createElement("script");
        o.type = "text/javascript";
        o.async = true;
        o.src = i + "?sdkid=" + e + "&lib=ttq";
        
        const a = document.getElementsByTagName("script")[0];
        if (a && a.parentNode) {
          a.parentNode.insertBefore(o, a);
        } else {
          document.head.appendChild(o);
        }
      };

      // Load your TikTok Pixel ID safely
      window.ttq.load('D70SHCBC77UA3D4K6430');
    }

    // Fire initial page view for TikTok safely
    if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.page === 'function') {
      window.ttq.page();
    }
  }, []);

  const navigateToForm = () => {
    setCurrentScreen('form');
  };

  const navigateToVerification = (eventId) => {
    setFormEventId(eventId);
    setCurrentScreen('verification');
  };

  const navigateToWelcome = () => {
    setCurrentScreen('welcome');
    setFormEventId(null);
  };

  return (
    <>
      <Helmet>
        <title>بريد الجزائر موبايل</title>
        <meta name="description" content="تطبيق بريد الجزائر للخدمات البريدية الرقمية." />
      </Helmet>
      <div className="font-sans">
        {currentScreen === 'welcome' && <WelcomeScreen onContinue={navigateToForm} />}
        {currentScreen === 'form' && (
          <PhoneNumberForm
            onContinue={navigateToVerification}
            onTryAgain={navigateToWelcome}
          />
        )}
        {currentScreen === 'verification' && (
          <VerificationScreen onOk={navigateToWelcome} eventId={formEventId} />
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
