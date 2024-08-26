import { SignInSchema, signInSchema } from "@/schema/signInSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseStatus } from "@/types/responseStatus";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import { signUpAction } from "@/app/api/auth/signUpAction";
import { signInAction } from "@/app/api/auth/signInAction";

const useSignInHandler = () => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const t = useTranslations("SigninPage");
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: SignInSchema) => await signInAction(data),
    onSettled: (response) => {
      if (response?.status !== 200) {
        setFormStatus({ message: "signInError", status: "ERROR" });
      } else {
        setFormStatus({ message: "signInSuccess", status: "SUCCESS" });
        toast.success(t("signInSuccess"));
        router.push("/dashboard");
      }
    },
  });

  return { formStatus, handleSubmit, isPending, mutate, register, errors };
};

export default useSignInHandler;
