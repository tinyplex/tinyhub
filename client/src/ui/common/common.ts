export const SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: 'instant',
  block: 'nearest',
};

export const formatNumber = (num: any) =>
  num < 1000
    ? num
    : (num / 1000).toFixed(num < 10000 ? 1 : 0) + (num < 1000 ? '' : 'k');

export const formatDate = (date: any) => new Date(date).toLocaleDateString();
