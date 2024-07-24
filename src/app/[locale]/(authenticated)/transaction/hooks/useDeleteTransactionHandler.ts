import deleteTransactionAction from "@/app/api/user/transaction/deleteTransactionAction";
import { trpc } from "@/context/QueryProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { toast } from "sonner";

const useDeleteTransactionHandler = (id: string) => {
  const { mutate: deleteTransaction, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async () => await deleteTransactionAction(id),
      onSettled: (res) => {
        if (res?.status === "SUCCESS") {
          toast.success(res.message);
          queryClient.invalidateQueries({
            queryKey: transactionQueryKey,
          });
          queryClient.invalidateQueries({ queryKey: balanceQueryKey });
        }
      },
    }
  );

  const queryClient = useQueryClient();
  const transactionQueryKey = getQueryKey(trpc.balance.getTransactionHistory);
  const balanceQueryKey = getQueryKey(trpc.balance.getBalance);

  return { deleteTransaction, isDeletePending };
};

export default useDeleteTransactionHandler;
