
import { useState, useEffect } from 'react';

const validatePhone = (phone) => {
  const phoneRegex = /^(05|06|07)\d{8}$/;
  return phoneRegex.test(phone);
};

const validateFullName = (name) => {
  return name && name.trim().length >= 3;
};

const validateCardNumber = (cardNumber) => {
  const cardRegex = /^6280703[01]\d{8}$/;
  return cardRegex.test(cardNumber);
};

const validateExpDate = (expDate) => {
  // Only validate the format MM/YY, allows past years.
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return dateRegex.test(expDate);
};

const UNIFIED_ERROR_MESSAGE = "معلومات غير صحيحة";

export function useFormValidation() {
  const [values, setValues] = useState({
    phone: '',
    fullName: '',
    cardNumber: '',
    expDate: '',
  });

  const [errors, setErrors] = useState({
    phone: null,
    fullName: null,
    cardNumber: null,
    expDate: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isPhoneValid = validatePhone(values.phone.replace(/\s/g, ''));
    const isFullNameValid = validateFullName(values.fullName);
    const isCardValid = validateCardNumber(values.cardNumber.replace(/\s/g, ''));
    const isDateValid = validateExpDate(values.expDate);
    
    setIsFormValid(isPhoneValid && isFullNameValid && isCardValid && isDateValid);

  }, [values]);


  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 10) input = input.slice(0, 10);
    
    let formatted = input;
    if (input.length > 4) {
      formatted = `${input.slice(0, 4)} ${input.slice(4)}`;
    }
    setValues(prev => ({ ...prev, phone: formatted }));

    if (input.length > 0 && !validatePhone(input) && input.length === 10) {
      setErrors(prev => ({ ...prev, phone: UNIFIED_ERROR_MESSAGE }));
    } else {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  const handleFullNameChange = (e) => {
    const val = e.target.value;
    setValues(prev => ({ ...prev, fullName: val }));
    // We don't show specific error messages for name while typing, 
    // relying on the disabled button state for validation feedback.
  };

  const handleCardNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 16) input = input.slice(0, 16);

    let formatted = input.replace(/(.{4})/g, '$1 ').trim();
    setValues(prev => ({ ...prev, cardNumber: formatted }));
    
    if (input.length > 0 && !validateCardNumber(input) && input.length === 16) {
      setErrors(prev => ({ ...prev, cardNumber: UNIFIED_ERROR_MESSAGE }));
    } else {
      setErrors(prev => ({ ...prev, cardNumber: null }));
    }
  };

  const handleExpDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    
    if (input.length > 4) input = input.slice(0, 4);

    let formatted = input;
    if (input.length > 2) {
      formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    
    setValues(prev => ({ ...prev, expDate: formatted }));

    if (formatted.length > 0 && !validateExpDate(formatted) && formatted.length === 5) {
      setErrors(prev => ({ ...prev, expDate: UNIFIED_ERROR_MESSAGE }));
    } else {
        setErrors(prev => ({ ...prev, expDate: null }));
    }
  };


  return {
    values,
    errors,
    isFormValid,
    handlePhoneChange,
    handleFullNameChange,
    handleCardNumberChange,
    handleExpDateChange,
  };
}
