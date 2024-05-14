"use server";

import {
  UpdateCurrencySignSchema,
  updateCurrencySignSchema,
} from "@/app/[locale]/(authenticated)/settings/settingsType";
import { getUserId } from "../../api_util/getUserId";
import { getLocale, getTranslations } from "next-intl/server";
import prisma from "../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

const updateCurrencySignAction = async (data: UpdateCurrencySignSchema) => {
  try {
    const isSafe = updateCurrencySignSchema.safeParse(data);
    if (!isSafe.success) throw new Error("Invalid data");

    const userId = await getUserId();
    if (!userId) throw new Error("User not found");

    await prisma?.user.update({
      where: { id: userId },
      data: { currencySign: data.currencySign },
    });

    const t = await getTranslations("SettingsPage");
    revalidatePath("/", "layout");
    return { status: "SUCCESS", message: t("currencySignUpdateSuccess") };
  } catch (error) {
    if (error instanceof Error) {
      return { status: "ERROR", message: error.message };
    }
    return { status: "ERROR", message: "Something went wrong" };
  }
};

export default updateCurrencySignAction;
