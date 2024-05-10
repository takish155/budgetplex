import sendForgetPasswordAction from "@/app/api/user/verification/sendForgetPasswordAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  SendResetPasswordEmail,
  sendResetPasswordEmailSchema,
} from "../schema/sendResetPasswordEmail";
import { useForm } from "react-hook-form";

const useSendResetPasswordEmail = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => await sendForgetPasswordAction(email),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
      }
      if (res?.status === "ERROR") {
        toast.error(res.message);
      }
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SendResetPasswordEmail>({
    resolver: zodResolver(sendResetPasswordEmailSchema),
  });

  return { mutate, isPending, handleSubmit, errors, register };
};

export default useSendResetPasswordEmail;
