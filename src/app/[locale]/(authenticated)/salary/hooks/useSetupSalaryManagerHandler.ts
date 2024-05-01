import setupSalaryManagerAction from "@/app/api/user/salary/setupSalaryManagerAction";
import {
  SetupSalaryManager,
  setupSalaryManagerSchema,
} from "@/schema/setupSalaryManagerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSetupSalaryManagerHandler = () => {
  const router = useRouter();
  const locale = useLocale();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SetupSalaryManager) =>
      await setupSalaryManagerAction(data),
    onSettled: (res) => {
      toast.success(res?.message);
      router.push(`/${locale}/salary`);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SetupSalaryManager>({
    resolver: zodResolver(setupSalaryManagerSchema),
  });
  return { register, handleSubmit, errors, isPending, mutate, control };
};
