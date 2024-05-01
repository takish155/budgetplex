import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import AddShiftForm from "../forms/AddShiftForm";

const AddShiftFormModal = () => {
  const t = useTranslations("Salary");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>{t("addShift")}</SheetTitle>
          <SheetDescription>{t("addShiftDescription")}</SheetDescription>
        </SheetHeader>
        <AddShiftForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddShiftFormModal;
