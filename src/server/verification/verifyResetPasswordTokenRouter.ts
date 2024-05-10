import z from "zod";
import { publicProcedure, router } from "../trpc";
import { ResponseStatus } from "@/types/responseStatus";
import bcrpyt from "bcrypt";
import { getLocale, getTranslations } from "next-intl/server";
import prisma from "../../../lib/prisma";

export const verifyResetPasswordTokenRouter = router({
  verifyResetPasswordToken: publicProcedure
    .input(z.string())
    .query(async (opts): Promise<ResponseStatus> => {
      try {
        const t = await getTranslations("ResetPassword");

        const token = await prisma.forgotPassword.findMany();

        let data;
        for (let i = 0; i < token.length; i++) {
          const match = await bcrpyt.compare(opts.input, token[i].token);
          if (match && token[i].expires > new Date()) {
            data = token[i];
            break;
          }
        }

        if (!data) throw new Error(t("tokenInvalidOrExpired"));

        console.log(data.userId);
        return { message: data.userId, status: "SUCCESS" };
      } catch (error) {
        if (error instanceof Error) {
          return { message: error.message, status: "ERROR" };
        }
        return { message: "An error occurred", status: "ERROR" };
      }
    }),
});
