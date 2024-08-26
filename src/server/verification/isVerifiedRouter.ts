import { auth } from "@/auth";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../lib/prisma";

export const isVerifiedRouter = router({
  isVerified: publicProcedure.query(async () => {
    try {
      const session = await auth();
      if (!session) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user!.email!,
        },
        select: { emailVerified: true },
      });
      if (!user) throw new Error("User not found");

      return { isVerified: user?.emailVerified, status: "SUCCESS" };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: "ERROR" };
      }
      return { message: "An error occurred", status: "ERROR" };
    }
  }),
});
