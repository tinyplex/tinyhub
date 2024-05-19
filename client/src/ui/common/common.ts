export const formatNumber = (num: number) =>
  num < 1000 ? num : (num / 1000).toFixed(1) + (num < 1000 ? '' : 'k');
