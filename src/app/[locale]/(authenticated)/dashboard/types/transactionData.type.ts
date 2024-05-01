import { TransactionCategory } from "@/schema/addTransactionSchema";

export type TransactionData = {
  date: Date;
  title: string;
  category: TransactionCategory;
  amount: number;
  type: string;
  description: string | null;
  id: string;
};
