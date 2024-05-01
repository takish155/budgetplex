import { useForm } from "react-hook-form";
import { UpdatePasswordSchema, updatePasswordSchema } from "../settingsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import updatePasswordAction from "@/app/api/user/settings/updatePasswordAction";
import { toast } from "sonner";

const useUpdatePasswordHandler = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdatePasswordSchema) =>
      await updatePasswordAction(data),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        reset();
      }
      if (res?.status === "ERROR") {
        toast.error(res.message);
      }
    },
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  return {
    register,
    errors,
    handleSubmit,
    isPending,
    mutate,
  };
};

export default useUpdatePasswordHandler;
