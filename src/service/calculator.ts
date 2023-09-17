export const calcDiscountRate = (original: number, discounted: number) => {
  return Math.ceil(((original - discounted) / original) * 100);
};

export const formatPrice = (price: string) => {
  if (price.length > 3) {
    return price.slice(0, -3) + ',' + price.slice(-3);
  }
  return price;
};

export function getCurrentDateTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
