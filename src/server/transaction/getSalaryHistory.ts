import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";

export const getSalaryHistoryRouter = router({
  getSalaryHistory: publicProcedure.query(async () => {
    try {
      const session = await getServerSession();
      if (!session) {
        throw new Error("Unauthorized");
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const userSalarySettings = await prisma.userSalarySettings.findUnique({
        where: { userId: user.id },
      });
      if (!userSalarySettings) {
        throw new Error("User salary settings not found");
      }

      const salaryHistory = await prisma.salary.findMany({
        where: { userId: user.id },
        include: { shifts: true },
        orderBy: { date: "desc" },
      });

      return { data: { salaryHistory, userSalarySettings }, status: "SUCCESS" };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: "ERROR" };
      }
      return { message: "An error occurred", status: "ERROR" };
    }
  }),
});
