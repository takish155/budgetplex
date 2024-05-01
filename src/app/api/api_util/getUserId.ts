import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";

export const getUserId = async () => {
  const session = await getServerSession();
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
