/**
 * Format views count for display
 * @example
 * formatViews(1234) // '1.2K'
 * formatViews(1000000) // '1M'
 * formatViews(500) // '500'
 */
export const formatViews = (views: number | string | null | undefined): string => {
  if (!views || views === 0) return "0";
  
  const num = typeof views === 'string' ? Number(views) : views;
  if (isNaN(num)) return "0";
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1000000000) {
    return `${sign}${(absNum / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  } else if (absNum >= 1000000) {
    return `${sign}${(absNum / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  } else if (absNum >= 1000) {
    return `${sign}${(absNum / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  } else {
    return num.toString();
  }
};

/**
 * Format likes count for display
 * @example
 * formatLikes(1234) // '1.2K'
 * formatLikes(1000000) // '1M'  
 * formatLikes(50) // '50'
 */
export const formatLikes = (likes: number | string | null | undefined): string => {
  if (!likes || likes === 0) return "0";
  
  const num = typeof likes === 'string' ? Number(likes) : likes;
  if (isNaN(num)) return "0";
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1000000000) {
    return `${sign}${(absNum / 1000000000).toFixed(1).replace(/\.0$/, '')}B`;
  } else if (absNum >= 1000000) {
    return `${sign}${(absNum / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  } else if (absNum >= 1000) {
    return `${sign}${(absNum / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  } else {
    return num.toString();
  }
};

/**
 * Format general numbers with thousands separator
 * @example
 * formatNumber(1234) // '1,234'
 * formatNumber(1000000) // '1,000,000'
 */
export const formatNumber = (num: number | string | null | undefined): string => {
  if (!num || num === 0) return "0";
  
  const number = typeof num === 'string' ? Number(num) : num;
  if (isNaN(number)) return "0";
  
  return number.toLocaleString('en-US');
}; 