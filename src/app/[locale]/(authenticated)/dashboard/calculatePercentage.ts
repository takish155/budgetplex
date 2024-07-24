type CalculatePercentagesProps = {
  id: string;
  userId: string;
  goalName: string;
  goalAmount: number;
  goalProgress: number;
  goalDescription: string | null;
  goalDeadline: Date;
  goalCreated: Date;
  description: string | null;
};

export const calculatePercentages = (data: CalculatePercentagesProps[]) => {
  return data.map((item) => {
    const goalProgressPercentage = (item.goalProgress / item.goalAmount) * 100;

    return {
      ...item,
      goalAmountPercentage: 100 - goalProgressPercentage,
      goalProgressPercentage,
    };
  });
};
