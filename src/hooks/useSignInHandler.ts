import { SignInSchema, signInSchema } from "@/schema/signInSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseStatus } from "@/types/responseStatus";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    mutationFn: async (data: SignInSchema) =>
      await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      }),
    onSettled: (response) => {
      if (!response?.ok) {
        setFormStatus({ message: "signInError", status: "ERROR" });
      } else {
        setFormStatus({ message: "signInSuccess", status: "SUCCESS" });
        toast.success(t("signInSuccess"));
        router.refresh();
      }
    },
  });

  return { formStatus, handleSubmit, isPending, mutate, register, errors };
};

export default useSignInHandler;
