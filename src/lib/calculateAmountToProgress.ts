export const calculateAmountToProgress = (
  amount: number,
  goalAmount: number
) => {
  return Math.floor((amount / goalAmount) * 100);
};
