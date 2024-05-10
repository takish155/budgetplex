import updateTransactionAction from "@/app/api/user/transaction/updateTransactionAction";
import { trpc } from "@/context/QueryProvider";
import {
  AddTransactionType,
  addTransactionSchema,
} from "@/schema/addTransactionSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUpdateTransactionHandler = (id: string) => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });

  const { mutate: updateTransaction, isPending: isUpdatePending } = useMutation(
    {
      mutationFn: async (data: AddTransactionType) =>
        await updateTransactionAction({ ...data, id }),
      onSettled: (response) => {
        setFormStatus(response!);
        if (response?.status === "SUCCESS") {
          toast.success(response.message);
          queryClient.invalidateQueries({
            queryKey: transactionQueryKey,
          });
          queryClient.invalidateQueries({ queryKey: balanceQueryKey });
        }
      },
    }
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<AddTransactionType>({
    resolver: zodResolver(addTransactionSchema),
  });

  const queryClient = useQueryClient();
  const transactionQueryKey = getQueryKey(trpc.balance.getTransactionHistory);
  const balanceQueryKey = getQueryKey(trpc.balance.getBalance);

  return {
    formStatus,
    handleSubmit,
    register,
    errors,
    control,
    updateTransaction,
    isUpdatePending,
  };
};

export default useUpdateTransactionHandler;
