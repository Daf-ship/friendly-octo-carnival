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

    // 2. TIKTOK PIXEL INITIALIZATION (Fixed)
    if (!window.ttq) {
      window.TiktokAnalyticsObject = 'ttq';
      var ttq = window['ttq'] = window['ttq'] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = function(t, e) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function (t) {
        var e = ttq._i[t] || [];
        return e;
      };
      ttq.load = function(e, n) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = i;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        var o = document.createElement("script");
        o.type = "text/javascript";
        o.async = !0;
        o.src = i + "?sdkid=" + e + "&lib=ttq";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(o, a);
      };

      // Load your TikTok Pixel ID safely
      ttq.load('D70SHCBC77UA3D4K6430');
    }
    // Fire initial page view for TikTok safely
    if (window.ttq && typeof window.ttq.page === 'function') {
      window.ttq.page();
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
