import React from "react";

interface DisplayAmountProps {
  type: string;
  amount: number;
}

const DisplayAmount = ({ amount, type }: DisplayAmountProps) => {
  return (
    <div>
      <h3 className="text-paragraph font-light">{type}</h3>
      <h3 className="text-miniheader font-bold">
        ${new Intl.NumberFormat().format(amount)}
      </h3>
    </div>
  );
};

export default DisplayAmount;
