import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseStatus } from "@/types/responseStatus";
import { SignUpSchema, signUpSchema } from "@/schema/signUpSchema";
import { signUpAction } from "@/app/api/auth/signUpAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const submitHandler = async (data: SignUpSchema) => {
    setFormStatus({ message: "", status: "LOADING" });
    try {
      const response = await signUpAction(data);
      setFormStatus(response);
      if (response.status === "SUCCESS") {
        toast.success(response.message);
        router.push("/dashboard");
      }
    } catch (err) {
      setFormStatus({ message: "Something went wrong", status: "ERROR" });
    }
  };

  return {
    formStatus,
    handleSubmit,
    submitHandler,
    register,
    errors,
  };
};

export default useSignUpHandler;
