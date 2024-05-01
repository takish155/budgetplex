import { useForm } from "react-hook-form";
import { UpdateUsernameSchema, updateUsernameSchema } from "../settingsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import updateUsernameAction from "@/app/api/user/settings/updateUsernameAction";
import { toast } from "sonner";

const useUpdateUsernameHandler = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: string) => await updateUsernameAction(data),
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
    register,
    formState: { errors },
  } = useForm<UpdateUsernameSchema>({
    resolver: zodResolver(updateUsernameSchema),
  });

  return {
    isPending,
    mutate,
    handleSubmit,
    register,
    errors,
  };
};

export default useUpdateUsernameHandler;
