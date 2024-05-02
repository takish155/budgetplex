"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import usePaidBillHandler from "@/hooks/usePaidBillHandler";
import { useTranslations } from "next-intl";
import React from "react";

const MarkAsUnpaidButton = ({ billId }: { billId: string }) => {
  const t = useTranslations("BillInfo");
  const { isUnmarkAsPaidPending, unmarkAsPaid } = usePaidBillHandler();
  return (
    <>
      {!isUnmarkAsPaidPending ? (
        <Button
          variant={"outline"}
          type="button"
          onClick={() => unmarkAsPaid({ billId })}
        >
          {t("markAsUnpaid")}
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MarkAsUnpaidButton;
