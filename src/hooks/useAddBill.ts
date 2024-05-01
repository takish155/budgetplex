import addBillAction from "@/app/api/user/bill/addBillAction";
import { AddBillType, addBillSchema } from "@/schema/addBillSchema";
import { ResponseStatus } from "@/types/responseStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useAddBill = () => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddBillType) => await addBillAction(data),
    onSettled: (res) => {
      setFormStatus(res!);
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<AddBillType>({
    resolver: zodResolver(addBillSchema),
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

export default useAddBill;
