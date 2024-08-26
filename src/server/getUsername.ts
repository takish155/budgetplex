import { auth } from "@/auth";
import { publicProcedure, router } from "./trpc";
import prisma from "../../lib/prisma";

export const getUsernameRouter = router({
  getUsername: publicProcedure.query(async () => {
    try {
      const session = await auth();
      if (!session) throw new Error("Unauthorized");

      const user = await prisma.user.findUnique({
        where: {
          id: session.user?.id,
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
