"use client";

import { Button } from "@/components/ui/button";
import usePaidBillHandler from "@/hooks/usePaidBillHandler";
import { useTranslations } from "next-intl";
import React from "react";
import { ClipLoader } from "react-spinners";

const MarkAsPaidButton = ({ billId }: { billId: string }) => {
  const t = useTranslations("BillInfo");
  const { isMarkAsPaidPending, markAsPaid } = usePaidBillHandler();
  return (
    <>
      {!isMarkAsPaidPending ? (
        <Button
          variant={"outline"}
          type="button"
          onClick={() => markAsPaid({ billId })}
        >
          {t("markAsPaid")}
        </Button>
      ) : (
        <ClipLoader />
      )}
    </>
  );
};

export default MarkAsPaidButton;
