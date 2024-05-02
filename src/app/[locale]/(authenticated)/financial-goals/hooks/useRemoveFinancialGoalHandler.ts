import removeFinancialGoalAction from "@/app/api/user/financial_goals/removeFinancialGoalAction";
import { useDialogStates } from "@/states/dialogStates";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useRemoveFinancialGoalHandler = () => {
  const { toggleRemoveFinancialGoalModal, isRemoveFinancialGoalModalOpen } =
    useDialogStates();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => await removeFinancialGoalAction(id),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        if (isRemoveFinancialGoalModalOpen) {
          toggleRemoveFinancialGoalModal();
        }
      }
    },
  });

  return { mutate, isPending };
};

export default useRemoveFinancialGoalHandler;
