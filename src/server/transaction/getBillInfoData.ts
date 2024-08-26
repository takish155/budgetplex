import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { auth } from "@/auth";
import prisma from "../../../lib/prisma";

export const getBillInfoDataRouter = router({
  getBillInfoData: publicProcedure
    .input(z.string().min(1).max(1000))
    .query(async (opts) => {
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

        const bill = await prisma.bills.findUnique({
          where: { id: opts.input, userId: user.id },
        });
        if (!bill) {
          throw new Error("Bill not found");
        }

        return { data: bill, status: "SUCCESS" };
      } catch (error) {
        if (error instanceof Error) {
          return { message: error.message, status: "ERROR" };
        }
        return { message: "An error occurred", status: "ERROR" };
      }
    }),
});
