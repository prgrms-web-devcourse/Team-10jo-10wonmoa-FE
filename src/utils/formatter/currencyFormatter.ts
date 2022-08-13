const KRW_REGEXP = new RegExp(/\B(?=(\d{3})+(?!\d))/, 'g');

export const currencyFormatter = (n: number, suffix = false) => {
  return n.toString().replace(KRW_REGEXP, ',') + (suffix ? '원' : '');
};
