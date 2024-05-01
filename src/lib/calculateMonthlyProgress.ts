const calculateMonthlyProgress = (goalAmout: number, canPayMonthly: number) => {
  // Calculate the goalAmount to how long it will take to reach the goal in months
  return Math.ceil(goalAmout / canPayMonthly);
};

export default calculateMonthlyProgress;
