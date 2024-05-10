import addTransactionAction from "@/app/api/user/transaction/addTransactionAction";
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

const useAddTransactionHandler = () => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    reset,
  } = useForm<AddTransactionType>({
    resolver: zodResolver(addTransactionSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddTransactionType) =>
      await addTransactionAction(data),
    onSettled: (response) => {
      setFormStatus(response!);
      if (response?.status === "SUCCESS") {
        toast.success(response.message);
        queryClient.invalidateQueries({
          queryKey: transactionQueryKey,
        });
        queryClient.invalidateQueries({ queryKey: balanceQueryKey });
        reset();
      }
    },
  });

  const queryClient = useQueryClient();
  const transactionQueryKey = getQueryKey(trpc.balance.getTransactionHistory);
  const balanceQueryKey = getQueryKey(trpc.balance.getBalance);

  return {
    formStatus,
    handleSubmit,
    isPending,
    mutate,
    register,
    errors,
    control,
  };
};

export default useAddTransactionHandler;
