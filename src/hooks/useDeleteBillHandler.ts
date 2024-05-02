import removeBillAction from "@/app/api/user/bill/removeBillAction";
import { useDialogStates } from "@/states/dialogStates";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteBillHandler = () => {
  const { toggleDeleteModal } = useDialogStates();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (billId: string) => await removeBillAction(billId),
    onSettled: (response) => {
      if (response?.status === "SUCCESS") {
        toast.success(response.message, { description: response.billName });
        toggleDeleteModal();
      }
    },
  });

  return { mutate, isSuccess, isPending };
};

export default useDeleteBillHandler;
