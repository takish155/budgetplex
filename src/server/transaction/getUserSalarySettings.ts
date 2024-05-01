import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";

export const getUserSalarySettingsRouter = router({
  getUserSalarySettings: publicProcedure.query(async () => {
    try {
      const session = await getServerSession();
      if (!session) {
        throw new Error("Unauthorized");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        select: { userSalarySettings: true },
      });
      if (!user) {
        throw new Error("User not found");
      }

      return user.userSalarySettings;
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: "ERROR" };
      }
      return { message: "An error occurred", status: "ERROR" };
    }
  }),
});
