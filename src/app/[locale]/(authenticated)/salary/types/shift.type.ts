import { SetupSalaryManager } from "@/schema/setupSalaryManagerSchema";

export interface ShiftTableProps {
  shifts: {
    id: string;
    userId: string;
    overtime: number;
    hourWorked: number;
    date: Date;
    salaryId: string | null;
  }[];
  overtimeRate: number;
  hourlyRate: number;
  taxRate: number;
}

export interface ShiftTableRowProps {
  id: string;
  userId: string;
  overtime: number;
  hourWorked: number;
  date: Date;
  salaryId: string | null;
  overtimeRate: number;
  hourlyRate: number;
  taxRate: number;
}

export interface UserSalarySettingsModalProps {
  hourlyRate: number;
  overtimeRate: number;
  taxRate: number;
  monthStartDate: number;
  payday: number;
}
