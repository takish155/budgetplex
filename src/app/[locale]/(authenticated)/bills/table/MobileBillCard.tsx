"use client";

import { Card } from "@/components/ui/card";
import { BillData } from "@/states/billDataState";
import React, { memo } from "react";
import UpdateBillModal from "../modals/UpdateBillModal";
import DelateModal from "../modals/DeleteModal";
import { useTranslations } from "next-intl";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import { formatToMoney } from "@/lib/formatToMoney";

const MobileBillCard = ({ bills }: { bills: BillData }) => {
  const t = useTranslations("BillInfo");
  const currencySign = useCurrencySign();

  return (
    <Card className="min-w-[280px] mb-8">
      <div className="p-4">
        <div className="text-paragraph font-semibold">
          <div className="flex justify-between">
            <h3 className="mb-2">{bills.billName}</h3>
            <p className="mb-2">
              {formatToMoney(bills.billAmount, currencySign)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-light">
              {t("billDueDate")} - {bills.dueDate.toLocaleDateString()}
            </p>
            <div className="flex gap-4">
              <UpdateBillModal
                billAmount={bills.billAmount}
                billName={bills.billName}
                billNote={bills.billNote ?? ""}
                dueDate={bills.dueDate}
                frequency={bills.frequency}
                billId={bills.id}
                isPaid={bills.isPaid}
              />
              <DelateModal billId={bills.id} billName={bills.billName} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(MobileBillCard);
