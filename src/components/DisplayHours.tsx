import { useTranslations } from "next-intl";
import React from "react";

interface DisplayHourProps {
  name: string;
  hour: number;
}

const DisplayHour = ({ hour, name }: DisplayHourProps) => {
  const t = useTranslations("Salary");
  return (
    <div>
      <h3 className="text-paragraph font-light">{name}</h3>
      <h3 className="text-miniheader font-bold">
        {hour} <span className="text-paragraph">{t("hour")}</span>
      </h3>
    </div>
  );
};

export default DisplayHour;
