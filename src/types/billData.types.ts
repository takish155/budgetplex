export type BillData = {
  id: string;
  billName: string;
  billAmount: number;
  billNote: string | null;
  frequency: number;
  dueDate: Date;
  isPaid: boolean;
}[];

export type RenderBillTableProps = {
  data: BillData;
  currentDate: Date;
};
