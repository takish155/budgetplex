import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { FilterIcon } from "lucide-react";
import FilterDate from "./select/FilterDate";
import TransactionFilter from "./render/TransactionFilter";
import CurrentDate from "./render/CurrentDate";

const FilterSection = () => {
  const t = useTranslations("Transaction");

  return (
    <Popover>
      <PopoverTrigger>
        <FilterIcon />
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] max-w-[600px]">
        <h2 className="mb-8 text-paragraph">{t("filterTransactions")}</h2>
        <h3 className="font-bold text-miniheader">
          <CurrentDate />
          <p className="sr-only">{t("filterTransactions")}</p>
        </h3>
        <FilterDate />
        <TransactionFilter />
      </PopoverContent>
    </Popover>
  );
};

export default FilterSection;
