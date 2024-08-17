import React from "react";
import SetupSalaryManagerForm from "../forms/SetupSalaryManagerForm";
import { getLocale, getTranslations } from "next-intl/server";
import { caller } from "@/server";
import { redirect } from "next/navigation";

const page = async () => {
  const translation = getTranslations("Salary");
  const lang = getLocale();
  const response = caller.balance.getSalaryData({
    index: 0,
  });

  const [t, locale, data] = await Promise.all([translation, lang, response]);

  if (data?.status !== "NOT_SETUP_YET") redirect(`/${locale}/salary`);

  return (
    <section className="mt-8 w-[95%] mx-auto">
      <h2 className="mb-2 text-miniheader flex justify-between items-center font-semibold">
        {t("getStarted")}
      </h2>
      <p className="font-extralight mb-8">{t("getStartedDescription")}</p>
      <SetupSalaryManagerForm />
    </section>
  );
};

export default page;
