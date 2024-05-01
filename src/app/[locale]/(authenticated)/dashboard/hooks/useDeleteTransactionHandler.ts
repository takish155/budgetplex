import deleteTransactionAction from "@/app/api/user/transaction/deleteTransactionAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteTransactionHandler = (id: string) => {
  const { mutate: deleteTransaction, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async () => await deleteTransactionAction(id),
      onSettled: (res) => {
        if (res?.status === "SUCCESS") {
          toast.success(res.message);
        }
      },
    }
  );

  return { deleteTransaction, isDeletePending };
};

export default useDeleteTransactionHandler;
