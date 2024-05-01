import markAsPaidBillAction from "@/app/api/user/bill/markAsPaidBillAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import markAsUnpaidBillAction from "@/app/api/user/bill/markAsUnpaidBillAction";

const usePaidBillHandler = () => {
  const { mutate: unmarkAsPaid, isPending: isUnmarkAsPaidPending } =
    useMutation({
      mutationFn: async ({ billId }: { billId: string }) =>
        await markAsUnpaidBillAction(billId),
      onSettled: (res) => {
        if (res?.status === "SUCCESS" && typeof res.message === "object") {
          toast.success(res.message.title, {
            description: res.message.description,
            action: {
              label: res.message.undo,
              onClick: () => {
                markAsPaid({
                  billId:
                    typeof res.message === "object" ? res.message.billId : "",
                });
              },
            },
          });
        }
      },
    });
  const { mutate: markAsPaid, isPending: isMarkAsPaidPending } = useMutation({
    mutationFn: async ({ billId }: { billId: string }) =>
      await markAsPaidBillAction(billId),
    onSettled: (res) => {
      if (res?.status === "SUCCESS" && typeof res.message === "object") {
        toast.success(res.message.title, {
          description: res.message.description,
          action: {
            label: res.message.undo,
            onClick: () => {
              unmarkAsPaid({
                billId:
                  typeof res.message === "object" ? res.message.billId : "",
              });
            },
          },
        });
      }
    },
  });

  return {
    markAsPaid,
    unmarkAsPaid,
    isMarkAsPaidPending,
    isUnmarkAsPaidPending,
  };
};

export default usePaidBillHandler;
