"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { enUS, ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale, useTranslations } from "next-intl";
const currentDate = new Date();

export function DatePicker({
  onChange,
  value,
}: {
  onChange: (...event: any[]) => void;
  value?: Date;
}) {
  const [date, setDate] = React.useState<Date>();
  const t = useTranslations("BillInfo");
  const locale = useLocale();

  React.useEffect(() => {
    if (value && date === undefined) {
      setDate(value);
    }
  }, [value, date]);

  React.useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: locale === "ja" ? ja : enUS })
          ) : (
            <span>{t("selectDueDate")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus={false}
          disabled={{ from: new Date(), to: new Date(0, 0, 0) }}
        />
      </PopoverContent>
    </Popover>
  );
}
