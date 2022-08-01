const TO_NUMBER_REGEXP = new RegExp(/\D/, 'g');

export const amountToNumberFormatter = (value: string) => {
  const result = value.replace(TO_NUMBER_REGEXP, '');
  if (result.length === 0) {
    return 0;
  } else {
    return parseInt(result);
  }
};
