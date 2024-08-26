"use server";

import { auth } from "@/auth";
import sendVerificationEmail from "../../api_util/sendVerificationEmail";
import { getTranslations } from "next-intl/server";
import prisma from "../../../../../lib/prisma";
import { getMinutes } from "@/lib/getMinutes";
import { ResponseStatus } from "@/types/responseStatus";

const resendVerificationTokenAction = async (): Promise<ResponseStatus> => {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const user = await prisma?.user.findUnique({
      where: { id: session.user?.id },
    });
    if (!user) throw new Error("User not found");

    const t = await getTranslations("VerificationPage");
    if (user.emailSendingInterval && user.emailSendingInterval > new Date()) {
      const minutes = getMinutes(user.emailSendingInterval);

      throw new Error(t("resendEmailInterval", { minutes }));
    }

    await sendVerificationEmail(user.id, session.user?.email!);
    await prisma?.user.update({
      where: { id: user.id },
      data: { emailSendingInterval: new Date(Date.now() + 300000) },
    });

    return { message: t("resendSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default resendVerificationTokenAction;
