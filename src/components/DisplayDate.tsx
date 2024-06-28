import { dateToString } from "@/lib/dateToString";
import { useLocale } from "next-intl";
import React from "react";

interface DisplayDateProps {
  heading: string;
  date: Date;
}

const DisplayDate = ({ date, heading }: DisplayDateProps) => {
  const locale = useLocale();

  return (
    <div className="min-w-[250px]">
      <h3 className="text-paragraph font-light">{heading}</h3>
      <h3 className="text-miniheader font-bold">
        {dateToString(date, locale)}
      </h3>
    </div>
  );
};

export default DisplayDate;
