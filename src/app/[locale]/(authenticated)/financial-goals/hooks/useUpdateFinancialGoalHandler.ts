import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import updateFinancialGoalAction from "@/app/api/user/financial_goals/updateFinancialGoalAction";
import { toast } from "sonner";
import {
  UpdateFinancialGoal,
  updateFinancialGoalSchema,
} from "../types/updateFinancialGoalSchema";

const useUpdateFinancialGoalHandler = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: UpdateFinancialGoal;
      id: string;
    }) => await updateFinancialGoalAction(data, id),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
      }
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UpdateFinancialGoal>({
    resolver: zodResolver(updateFinancialGoalSchema),
  });

  return { isPending, mutate, reset, handleSubmit, register, errors, control };
};

export default useUpdateFinancialGoalHandler;
