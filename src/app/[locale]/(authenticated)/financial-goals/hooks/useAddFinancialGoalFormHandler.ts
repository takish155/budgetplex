import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AddFinancialGoal,
  addFinancialGoalSchema,
} from "../types/addFinancialGoalSchema";
import { useMutation } from "@tanstack/react-query";
import addFinancialGoalAction from "@/app/api/user/financial_goals/addFinancialGoalAction";
import { toast } from "sonner";

const useAddFinancialGoalFormHandler = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: AddFinancialGoal) =>
      await addFinancialGoalAction(data),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        reset();
      }
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddFinancialGoal>({
    resolver: zodResolver(addFinancialGoalSchema),
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    mutate,
    watch,
  };
};

export default useAddFinancialGoalFormHandler;
