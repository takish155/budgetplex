import { Card } from "@/components/ui/card";
import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { ShiftTableRowProps } from "../../types/shift.type";
import UpdateShiftModal from "../../modal/UpdateShiftModal";

const ShiftCard = ({
  data,
  isSalary,
}: {
  data: ShiftTableRowProps;
  isSalary: boolean;
}) => {
  const t = useTranslations("Salary");
  const totalEarning =
    data.overtime * data.overtimeRate + data.hourWorked * data.hourlyRate;
  const totalEarningWithTax =
    totalEarning - (totalEarning * data.taxRate) / 100;

  return (
    <Card className="min-w-[280px] mb-8">
      <div className="p-4">
        <div className="text-paragraph">
          <div className="flex justify-between">
            <h3 className="mb-2 font-semibold">
              {data.date.toLocaleDateString()}
            </h3>
            <p>
              {t("expectedEarningHead")}...{" "}
              <span className="font-semibold">
                ${new Intl.NumberFormat().format(totalEarningWithTax)}
              </span>
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <div>
              <p className="font-light">
                {t("hoursWorkedHead")}...{" "}
                <span className="font-bold">
                  {data.hourWorked} {t("hour")}
                </span>
              </p>
              <p className="font-light">
                {t("overtimeWorkedHead")}...{" "}
                <span className="font-bold">
                  {data.overtime} {t("hour")}
                </span>
              </p>
            </div>
            <div>
              {!isSalary ? (
                <UpdateShiftModal
                  data={{
                    date: data.date,
                    hoursWorked: data.hourWorked,
                    overtimeHour: data.overtime,
                  }}
                  id={data.id}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(ShiftCard);

// import { Card } from "@/components/ui/card";
// import React from "react";
// import { TransactionData } from "../../types/transactionData.type";
// import TransactionAction from "../TransactionAction";
// import { useTranslations } from "next-intl";

// const TransactionCard = ({ data }: { data: TransactionData }) => {
//   const t = useTranslations("AddTransaction");

//   return (
//     <Card className="min-w-[280px] mb-8">
//       <div className="p-4">
//         <div className="text-paragraph font-semibold">
//           <div className="flex justify-between">
//             <h3 className="mb-2">{data.title}</h3>
//             <p
//               className={`mb-2 ${
//                 data.type === "income" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               ${new Intl.NumberFormat().format(data.amount)}
//             </p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="font-light">{t(data.category)}</p>
//             <div className="flex gap-4">
//               <TransactionAction data={data} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default TransactionCard;
