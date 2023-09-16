export const calcDiscountRate = (original: number, discounted: number) => {
  return Math.ceil(((original - discounted) / original) * 100);
};

export const formatPrice = (price: string) => {
  if (price.length > 3) {
    return price.slice(0, -3) + ',' + price.slice(-3);
  }
  return price;
};
