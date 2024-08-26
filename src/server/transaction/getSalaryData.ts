import { auth } from "@/auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { addMonths, setDate } from "date-fns";
import { getSalaryDates } from "@/lib/getSalaryDates";
import { z } from "zod";

export const getSalaryDataRouter = router({
  getSalaryData: publicProcedure
    .input(
      z.object({
        index: z.number(),
      })
    )
    .query(async (opts) => {
      const t = await getTranslations("Salary");
      const locale = await getLocale();
      try {
        const session = await auth();
        if (!session) {
          throw new Error("Unauthorized");
        }

        const user = await prisma.user.findUnique({
          where: { id: session.user?.id },
        });
        if (!user) {
          throw new Error("User not found");
        }

        if (!user.isSetupSalary) {
          return { message: "IDK", status: "NOT_SETUP_YET" };
        }

        const salaryInfo = await prisma.userSalarySettings.findUnique({
          where: { userId: user.id },
        });

        if (!salaryInfo) {
          return { message: "IDK", status: "NOT_SETUP_YET" };
        }

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + opts.input.index);

        const { endDate, startDate } = getSalaryDates(
          salaryInfo.startDay,
          currentDate.getMonth() + 1,
          currentDate.getFullYear()
        );

        const salary = await prisma.salary.findUnique({
          where: {
            userId: user.id,
          },
        });
        if (!salary) {
          await prisma.salary.create({
            data: {
              userId: user.id,
            },
          });
        }

        startDate.setDate(startDate.getDate() - 1);
        const shifts = await prisma.shift.findMany({
          where: {
            salaryId: salary?.id,
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        });

        // const oneMonthAhead = addMonths(new Date(), 1);

        // const salary = await prisma.salary.findFirst({
        //   where: { userId: user.id, date: { lte: oneMonthAhead } },
        //   orderBy: { date: "desc" },
        // });

        // if (!salary) {
        //   const currentDayOfMonth = setDate(new Date(), salaryInfo.startDay);
        //   const lastMonth = addMonths(currentDayOfMonth, -1);
        //   const lastSalary = await prisma.salary.findFirst({
        //     where: { userId: user.id, date: { lte: lastMonth } },
        //     orderBy: { date: "desc" },
        //   });

        //   if (lastSalary) {
        //     const lastAllShift = await prisma.shift.findMany({
        //       where: { userId: user.id, salaryId: lastSalary.id },
        //     });
        //     const lastMonthTotalEarnings = lastAllShift.reduce((acc, shift) => {
        //       return (
        //         acc +
        //         shift.overtime * salaryInfo.overtime +
        //         shift.hourWorked * salaryInfo.hourlyRate
        //       );
        //     }, 0);

        //     lastMonth.setDate(salaryInfo.startDay);
        //     await prisma.income.create({
        //       data: {
        //         userId: user.id,
        //         amount: lastMonthTotalEarnings,
        //         date: lastMonth,
        //         category: "salary",
        //         title: t("salary"),
        //       },
        //     });
        //   }

        //   await prisma.salary.create({
        //     data: {
        //       userId: user.id,
        //       date: currentDayOfMonth,
        //     },
        //   });
        // }

        // const shifts = await prisma.shift.findMany({
        //   where: { userId: user.id, salaryId: salary?.id },
        // });

        const overtime = shifts.reduce((acc, shift) => {
          return acc + shift.overtime;
        }, 0);

        const hourWorked = shifts.reduce((acc, shift) => {
          return acc + shift.hourWorked;
        }, 0);

        const expectedSalary =
          overtime * salaryInfo.overtime + hourWorked * salaryInfo.hourlyRate;
        const expectedSalaryWithTax =
          expectedSalary - (expectedSalary * salaryInfo.taxRate) / 100;

        return {
          status: "SUCCESS",
          data: {
            overtime,
            hourWorked,
            expectedSalary: expectedSalaryWithTax,
            shifts,
            overtimeRate: salaryInfo.overtime,
            hourlyRate: salaryInfo.hourlyRate,
            taxRate: salaryInfo.taxRate,
            payday: salaryInfo.payday,
            startDay: salaryInfo.startDay,
            startDayInDate: startDate,
            endDayInDate: endDate,
          },
        };
      } catch (error) {
        if (error instanceof Error) {
          return { message: error.message, status: "ERROR" };
        }
        return { message: "An error occurred", status: "ERROR" };
      }
    }),
});
