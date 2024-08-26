import prisma from "../../../../lib/prisma";
import { auth } from "@/auth";

export const getUserId = async () => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user!.email!,
    },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  return user.id;
};
