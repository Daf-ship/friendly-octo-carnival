
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import WelcomeScreen from '@/components/WelcomeScreen';
import PhoneNumberForm from '@/components/PhoneNumberForm';
import VerificationScreen from '@/components/VerificationScreen';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formEventId, setFormEventId] = useState(null);

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
  }

  return (
    <>
      <Helmet>
        <title>بريد الجزائر موبايل</title>
        <meta name="description" content="تطبيق بريد الجزائر للخدمات البريدية الرقمية." />
      </Helmet>
      <div className="font-sans">
        {currentScreen === 'welcome' && <WelcomeScreen onContinue={navigateToForm} />}
        {currentScreen === 'form' && <PhoneNumberForm onContinue={navigateToVerification} onTryAgain={navigateToWelcome} />}
        {currentScreen === 'verification' && <VerificationScreen onOk={navigateToWelcome} eventId={formEventId} />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
