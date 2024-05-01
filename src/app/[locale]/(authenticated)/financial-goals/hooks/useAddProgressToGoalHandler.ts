import addProgressToGoalAction from "@/app/api/user/financial_goals/addProgressToGoalAction";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";

const useAddProgressToGoalHandler = () => {
  const [progressValue, setProgressValue] = useState(0);
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) =>
      await addProgressToGoalAction(id, amount),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        setProgressValue(0);
      }
    },
  });

  return { progressValue, isPending, mutate, setProgressValue };
};

export default useAddProgressToGoalHandler;
