import { z } from "zod";

export const setupSalaryManagerSchema = z.object({
  hourlyRate: z
    .number({})
    .positive({ message: "invalidHourlyRateError" })
    .max(99999999999999, { message: "invalidHourlyRateError" }),
  overtimeRate: z
    .number()
    .positive({ message: "invalidOverTimeRateError" })
    .max(99999999999999, { message: "invalidOverTimeRateError" }),
  taxRate: z
    .number()
    .min(0, { message: "invalidTaxRateError" })
    .max(100, { message: "invalidTaxRateError" }),
  monthStartDate: z
    .number()
    .min(1, { message: "invalidMonthStartDateError" })
    .max(31, { message: "invalidMonthStartDateError" }),
  payday: z
    .number()
    .min(1, { message: "invalidPaydayDateError" })
    .max(31, { message: "invalidPaydayDateError" }),
});

export type SetupSalaryManager = z.infer<typeof setupSalaryManagerSchema>;
