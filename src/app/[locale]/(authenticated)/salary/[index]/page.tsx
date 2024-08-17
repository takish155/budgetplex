import { caller } from "@/server";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";
import { SalaryStatistic } from "../statistic/SalaryStatistic";
import AddShiftFormModal from "../modal/AddShiftFormModal";
import dynamic from "next/dynamic";
import RenderTableList from "../render/RenderTableList";
import Spinner from "@/components/Spinner";

const UserSalarySettingsModal = dynamic(
  () => import("../modal/UserSalarySettingsModal"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-4 md:hidden">
        <Spinner />
      </div>
    ),
  }
);

const page = async ({ params }: { params: { index?: string } }) => {
  const translation = getTranslations("Salary");
  const lang = getLocale();
  const data = caller.balance.getSalaryData({
    index: params.index ? parseInt(params.index) : 1,
  });

  const [t, locale, response] = await Promise.all([translation, lang, data]);

  if (response?.status === "NOT_SETUP_YET") {
    redirect(`/${locale}/salary/setup`);
  }

  return (
    <section className="mt-8 w-[95%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="mb-4 text-miniheader font-semibold">{t("header")}</h2>
        <div>
          <AddShiftFormModal />{" "}
          <UserSalarySettingsModal
            data={{
              hourlyRate: response.data?.hourlyRate ?? 0,
              overtimeRate: response.data?.overtimeRate ?? 0,
              taxRate: response.data?.taxRate ?? 0,
              payday: parseInt(response.data?.payday ?? "0") ?? 0,
              monthStartDate: response.data?.startDay ?? 0,
            }}
          />
        </div>
      </div>
      <SalaryStatistic
        data={{
          expectedSalary: response.data?.expectedSalary ?? 0,
          hourWorked: response.data?.hourWorked ?? 0,
          overtime: response.data?.overtime ?? 0,
          startDate: response.data?.startDayInDate ?? new Date(),
          endDate: response.data?.endDayInDate ?? new Date(),
        }}
      />
      <RenderTableList data={response.data!} />
    </section>
  );
};

export default page;
