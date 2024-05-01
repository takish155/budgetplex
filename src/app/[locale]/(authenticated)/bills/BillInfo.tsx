import { caller } from "@/server";
import { getTranslations } from "next-intl/server";
import React from "react";
import AddBillModal from "./modals/AddBillModal";
import DisplayAmount from "@/components/DisplayAmount";

const BillInfo = async () => {
  const t = await getTranslations("BillInfo");
  const response = await caller.balance.getBillInfo();

  if (response.status === "ERROR") {
    return <div>{response.message}</div>;
  }

  return (
    <section>
      <h2 className="mb-4 text-miniheader flex justify-between items-center font-semibold">
        {t("title")} <AddBillModal />
      </h2>
      <p className="font-extralight mb-8">{t("description")}</p>

      <section className="flex justify-between mb-11 flex-wrap gap-8">
        <DisplayAmount
          amount={response.data?.unpaidBills ?? 0}
          type={t("remainingBill")}
        />
        <DisplayAmount
          amount={response.data?.paidBills ?? 0}
          type={t("billPaidThisMonth")}
        />
        <DisplayAmount
          amount={response.data?.monthlyBillAmount ?? 0}
          type={t("monthlyBill")}
        />
      </section>
    </section>
  );
};

export default BillInfo;
