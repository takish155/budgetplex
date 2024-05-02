"use client";

import removeBillAction from "@/app/api/user/bill/removeBillAction";
import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDeleteBillHandler from "@/hooks/useDeleteBillHandler";
import { useDialogStates } from "@/states/dialogStates";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

const DelateModal = ({
  billId,
  billName,
}: {
  billId: string;
  billName: string;
}) => {
  const t = useTranslations("BillInfo");
  const { mutate, isPending } = useDeleteBillHandler();
  const { toggleDeleteModal, isDelateModalOpen } = useDialogStates();
  return (
    <AlertDialog open={isDelateModalOpen}>
      <AlertDialogTrigger asChild onClick={() => toggleDeleteModal()}>
        <Button variant="link">
          <Trash2 color={"red"} />
          <p className="sr-only">{t("deleteBill")}</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("deleteBill")} {"   "} &apos;{billName}&apos;
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteConfimation")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          {isPending ? (
            <Spinner />
          ) : (
            <AlertDialogAction onClick={() => mutate(billId)}>
              {t("confirm")}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DelateModal;
