"use server";

import { ResponseStatus } from "@/types/responseStatus";
import prisma from "../../../../../lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { getMinutes } from "@/lib/getMinutes";
import { Resend } from "resend";
import { sendResetPasswordEmailSchema } from "@/app/[locale]/forget-password/schema/sendResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendForgetPasswordAction = async (
  email: string
): Promise<ResponseStatus> => {
  try {
    const isSafe = sendResetPasswordEmailSchema.safeParse({ email });
    if (!isSafe.success) throw new Error("Invalid data!");

    const t = await getTranslations("ResetPassword");

    const user = await prisma.user.findUnique({
      where: { email },
      include: { forgotPassword: true },
    });
    if (!user) {
      throw new Error(t("emailNotFoundError"));
    }

    if (
      user.forgotPassword.length !== 0 &&
      user.forgotPassword[0].expires.getTime() > Date.now()
    ) {
      const minutes = getMinutes(user.forgotPassword[0].expires);
      throw new Error(t("resetPasswordInterval", { minutes }));
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(verificationToken, 10);
    const verificationTokenExpiry = Date.now() + 360000;

    await prisma.forgotPassword.create({
      data: {
        token: hashedToken,
        expires: new Date(verificationTokenExpiry),
        userId: user.id,
      },
    });

    const locale = await getLocale();
    await resend.emails.send({
      to: user.email!,
      from: "Budgetplex <portfolio@takish155.dev>",
      subject: "Reset your password",
      text: `Click here to reset you password: ${process.env.NEXTAUTH_URL?.replace(
        /en/,
        locale
      )}/forget-password/${verificationToken}`,
    });

    return { message: t("resetPasswordSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default sendForgetPasswordAction;
