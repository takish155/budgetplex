import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import UpdateShiftForm from "../forms/UpdateShiftForm";
import { AddShiftType } from "@/schema/addShiftSchema";

const UpdateShiftModal = ({ data, id }: { data: AddShiftType; id: string }) => {
  const t = useTranslations("Salary");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"}>
          <Info />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>{t("addShift")}</SheetTitle>
          <SheetDescription>{t("addShiftDescription")}</SheetDescription>
        </SheetHeader>
        <UpdateShiftForm data={data} id={id} />
      </SheetContent>
    </Sheet>
  );
};

export default UpdateShiftModal;
