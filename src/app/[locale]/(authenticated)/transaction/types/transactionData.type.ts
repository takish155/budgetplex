import { TransactionCategory } from "@/schema/addTransactionSchema";

export type TransactionData = {
  date: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  type: string;
  description: string | null;
  id: string;
};
