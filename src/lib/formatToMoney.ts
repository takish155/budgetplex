export const formatToMoney = (amount: number, currency: string) => {
  return `${currency}${new Intl.NumberFormat().format(amount)}`;
};
