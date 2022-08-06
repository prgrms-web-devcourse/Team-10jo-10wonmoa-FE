import { useState } from 'react';
import { amountToNumberFormatter, currencyFormatter } from '@utils/formatter';

const useFormatAmount = (initialAmount = '') => {
  const [formattedAmount, setFormattedAmount] = useState(initialAmount);

  const handleAmount = (value: string) => {
    const formattedValue = currencyFormatter(amountToNumberFormatter(value));
    setFormattedAmount(formattedValue);
  };

  return { formattedAmount, setAmount: handleAmount };
};

export default useFormatAmount;
