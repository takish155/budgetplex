import removeFinancialGoalAction from "@/app/api/user/financial_goals/removeFinancialGoalAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useRemoveFinancialGoalHandler = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => await removeFinancialGoalAction(id),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
      }
    },
  });

  return { mutate };
};

export default useRemoveFinancialGoalHandler;
