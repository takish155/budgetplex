import { getServerSession } from "next-auth";
import { publicProcedure, router } from "./trpc";
import prisma from "../../lib/prisma";

export const getUsernameRouter = router({
  getUsername: publicProcedure.query(async () => {
    try {
      const session = await getServerSession();
      if (!session) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        select: { username: true },
      });

      if (!user) throw new Error("User not found");

      return user.username;
    } catch (error) {
      return { message: "Something went wrong", status: "ERROR" };
    }
  }),
});
