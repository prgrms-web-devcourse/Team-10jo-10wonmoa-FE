import { useRef, useState } from 'react';

const STRIP_REGEXP = new RegExp(/,/, 'g');
const TONUMBER_REGEXP = new RegExp(/\D/, 'g');
const KRW_REGEXP = new RegExp(/\B(?=(\d{3})+(?!\d))/, 'g');

const stripAmount = (value) => {
  return value.replace(STRIP_REGEXP, '');
};

const formatToNumber = (value) => {
  return value.replace(TONUMBER_REGEXP, '');
};

const formatToKRW = (value) => {
  return value.replace(KRW_REGEXP, ',');
};

const useFormatAmount = (initialAmount = '') => {
  const [formattedAmount, setFormattedAmount] = useState(initialAmount);
  const originAmount = useRef(initialAmount);

  const handleAmount = (value) => {
    const originValue = stripAmount(value);
    originAmount.current = originValue;

    const formattedValue = formatToKRW(formatToNumber(value));
    setFormattedAmount(formattedValue);
  };

  return { originAmount, formattedAmount, setAmount: handleAmount };
};

export default useFormatAmount;
