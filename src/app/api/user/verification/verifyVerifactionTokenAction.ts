"use server";

import { getTranslations } from "next-intl/server";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";

const verifyVerifactionTokenAction = async (tokenId: string) => {
  if (!tokenId) {
    throw new Error("Token is required");
  }
  try {
    const t = await getTranslations("VerificationPage");

    const verificationToken = await prisma.verificationToken.findMany({
      where: { expires: { gte: new Date() } },
    });
    if (!verificationToken) throw new Error("Token not found");
    const token = verificationToken.find(async (token) => {
      return await bcrypt.compare(tokenId, token.token);
    });

    if (!token) throw new Error(t("tokenInvalidOrExpired"));

    await prisma.user.update({
      where: { id: token.identifier },
      data: { emailVerified: true },
    });

    await prisma.verificationToken.deleteMany({
      where: { identifier: token.identifier },
    });

    return { message: t("verificationSuccess"), status: "SUCCESS" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: "ERROR" };
    }
    return { message: "An error occurred", status: "ERROR" };
  }
};

export default verifyVerifactionTokenAction;
