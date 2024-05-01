import deleteTransactionAction from "@/app/api/user/transaction/deleteTransactionAction";
import updateBillAction from "@/app/api/user/bill/updateBillAction";
import { AddBillType, addBillSchema } from "@/schema/addBillSchema";
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

const useUpdateBillHandler = (id: string) => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });

  const { mutate: updateBill, isPending: isUpdateBillPending } = useMutation({
    mutationFn: async (data: AddBillType) => await updateBillAction(id, data),
    onSettled: (response) => {
      setFormStatus({
        message: "",
        status: response?.status as "IDLE" | "ERROR" | "SUCCESS",
      });
      if (
        response?.status === "SUCCESS" ||
        typeof response?.message === "object"
      ) {
        toast.success(
          typeof response?.message === "object" ? response.message.title : "",
          {
            description:
              typeof response?.message === "object"
                ? response.message.billName
                : "",
          }
        );
      }
    },
  });

  const { mutate: deleteTransaction, isPending: isDeletePending } = useMutation(
    {
      mutationFn: async () => await deleteTransactionAction(id),
    }
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<AddBillType>({
    resolver: zodResolver(addBillSchema),
  });

  return {
    formStatus,
    handleSubmit,
    register,
    errors,
    control,
    updateBill,
    deleteTransaction,
    isUpdateBillPending,
    isDeletePending,
  };
};

export default useUpdateBillHandler;
