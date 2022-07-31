export const currencyFormatter = (n: number) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
    n
  );
};
