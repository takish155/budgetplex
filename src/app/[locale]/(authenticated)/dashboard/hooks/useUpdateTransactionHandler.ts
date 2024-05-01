import updateTransactionAction from "@/app/api/user/transaction/updateTransactionAction";
import {
  AddTransactionType,
  addTransactionSchema,
} from "@/schema/addTransactionSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
