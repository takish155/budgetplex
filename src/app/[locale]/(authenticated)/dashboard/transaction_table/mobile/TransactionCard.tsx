import { Card } from "@/components/ui/card";
import React, { memo } from "react";
import { TransactionData } from "../../types/transactionData.type";
import TransactionAction from "../TransactionAction";
import { useTranslations } from "next-intl";

const TransactionCard = ({ data }: { data: TransactionData }) => {
  const t = useTranslations("AddTransaction");

  return (
    <Card className="min-w-[280px] mb-8">
      <div className="p-4">
        <div className="text-paragraph font-semibold">
          <div className="flex justify-between">
            <h3 className="mb-2">{data.title}</h3>
            <p
              className={`mb-2 ${
                data.type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              ${new Intl.NumberFormat().format(data.amount)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-light">{t(data.category)}</p>
            <div className="flex gap-4">
              <TransactionAction data={data} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(TransactionCard);
