import addShiftAction from "@/app/api/user/salary/addShiftAction";
import { AddShiftType, addShiftSchema } from "@/schema/addShiftSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useAddShiftHandler = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
  } = useForm<AddShiftType>({ resolver: zodResolver(addShiftSchema) });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: AddShiftType) => await addShiftAction(data),
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

  return {
    errors,
    handleSubmit: handleSubmit,
    mutate,
    isPending,
    register,
    control,
  };
};

export default useAddShiftHandler;
