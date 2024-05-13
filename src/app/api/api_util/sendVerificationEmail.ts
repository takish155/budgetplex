import prisma from "../../../../lib/prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { getLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (userId: string, userEmail: string) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(verificationToken, 10);
  const verificationTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const locale = await getLocale();

  await prisma.verificationToken.create({
    data: {
      token: hashedToken,
      expires: new Date(verificationTokenExpiry),
      identifier: userId,
    },
  });

  const t = await getTranslations("VerificationPage");

  await resend.emails.send({
    to: userEmail,
    from: "Budgetplex <portfolio@takish155.dev>",
    subject: t("emailVerification"),
    text: `Click here to verify your email: ${process.env.NEXTAUTH_URL?.replace(
      /en/,
      locale
    )}/verify/${verificationToken}`,
  });
};

export default sendVerificationEmail;
