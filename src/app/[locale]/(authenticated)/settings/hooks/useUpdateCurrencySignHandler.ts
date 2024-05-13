import { useForm } from "react-hook-form";
import {
  UpdateCurrencySignSchema,
  updateCurrencySignSchema,
} from "../settingsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import updateCurrencySignAction from "@/app/api/user/settings/updateCurrencySignAction";

const useUpdateCurrencySignHandler = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateCurrencySignSchema) =>
      await updateCurrencySignAction(data),
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
  } = useForm<UpdateCurrencySignSchema>({
    resolver: zodResolver(updateCurrencySignSchema),
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending,
    mutate,
  };
};

export default useUpdateCurrencySignHandler;
