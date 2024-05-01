import addTransactionAction from "@/app/api/user/transaction/addTransactionAction";
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
        reset();
      }
    },
  });

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
