export type FinancialGoals = {
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
