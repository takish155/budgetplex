import updateUserSalarySettingsAction from "@/app/api/user/salary/updateUserSalarySettingsAction";
import {
  SetupSalaryManager,
  setupSalaryManagerSchema,
} from "@/schema/setupSalaryManagerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateUserSalarySettingsHandler = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SetupSalaryManager) =>
      await updateUserSalarySettingsAction(data),
    onSettled: (res) => {
      toast.success(res?.message);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SetupSalaryManager>({
    resolver: zodResolver(setupSalaryManagerSchema),
  });

  return { register, handleSubmit, errors, isPending, mutate, control, watch };
};
