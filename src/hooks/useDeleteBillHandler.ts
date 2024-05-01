import removeBillAction from "@/app/api/user/bill/removeBillAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteBillHandler = () => {
  const { mutate } = useMutation({
    mutationFn: async (billId: string) => await removeBillAction(billId),
    onSettled: (response) => {
      if (response?.status === "SUCCESS") {
        toast.success(response.message, { description: response.billName });
      }
    },
  });

  return { mutate };
};

export default useDeleteBillHandler;
