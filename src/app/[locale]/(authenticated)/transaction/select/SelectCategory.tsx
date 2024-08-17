"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryEnum } from "@/schema/addTransactionSchema";
import { useTranslations } from "next-intl";
import { useTransactionContext } from "@/context/TransactionProvider";
import FormField from "@/components/FormField";

const SelectCategory = () => {
  const t = useTranslations("AddTransaction");
  const { handleChangeParams, category } = useTransactionContext() || {};
  if (!handleChangeParams) return null;

  return (
    <FormField htmlFor="category" placeholder={t("category")}>
      <Select
        value={category ?? "all"}
        onValueChange={(e) => {
          handleChangeParams("category", e);
        }}
      >
        <SelectTrigger className="w-[180px]" id="category">
          <SelectValue placeholder={t("category")} />
        </SelectTrigger>
        <SelectContent defaultValue="all">
          {categoryEnum.map((categories) => {
            return (
              <SelectItem
                defaultChecked={categories === "all"}
                key={categories}
                value={categories}
              >
                {t(categories)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </FormField>
  );
};

export default SelectCategory;
