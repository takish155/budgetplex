import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "../schema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordAction from "@/app/api/user/verification/resetPasswordAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const useResetPasswordHandler = (tokenId: string, userId: string) => {
  const router = useRouter();
  const locale = useLocale();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ResetPasswordSchema) =>
      await resetPasswordAction(data, userId, tokenId),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        router.push(`/${locale}/auth/signin`);
      }
      if (res?.status === "ERROR") {
        toast.error(res.message);
      }
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return { handleSubmit, register, errors, mutate, isPending };
};

export default useResetPasswordHandler;
