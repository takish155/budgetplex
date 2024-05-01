import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseStatus } from "@/types/responseStatus";
import { useMutation } from "@tanstack/react-query";
import { SignUpSchema, signUpSchema } from "@/schema/signUpSchema";
import { signUpAction } from "@/app/api/auth/signUpAction";
import { signIn } from "next-auth/react";

const useSignUpHandler = () => {
  const [formStatus, setFormStatus] = useState<ResponseStatus>({
    message: "",
    status: "IDLE",
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: SignUpSchema) => await signUpAction(data),
    onSettled: (res) => setFormStatus(res!),
  });

  const submitHandler = async (data: SignUpSchema) => {
    setFormStatus({ message: "", status: "LOADING" });
    try {
      const response = await signUpAction(data);
      setFormStatus(response);
      if (response.status === "SUCCESS") {
        await signIn("credentials", {
          redirect: false,
          username: data.username,
          password: data.password,
        });
      }
    } catch (err) {
      setFormStatus({ message: "Something went wrong", status: "ERROR" });
    }
  };

  return {
    formStatus,
    handleSubmit,
    isPending,
    submitHandler,
    register,
    errors,
  };
};

export default useSignUpHandler;
