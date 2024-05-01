import React from "react";
import { useForm } from "react-hook-form";
import { UpdateEmailSchema, updateEmailSchema } from "../settingsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import updateEmailAction from "@/app/api/user/settings/updateEmailAction";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const useUpdateEmailHandler = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateEmailSchema) =>
      await updateEmailAction(data.email),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        signOut();
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
  } = useForm<UpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending,
    mutate,
  };
};

export default useUpdateEmailHandler;
