import addShiftAction from "@/app/api/user/salary/addShiftAction";
import updateShiftAction from "@/app/api/user/salary/updateShiftAction";
import { AddShiftType, addShiftSchema } from "@/schema/addShiftSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUpdateShiftHandler = (id: string) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    control,
    watch,
  } = useForm<AddShiftType>({ resolver: zodResolver(addShiftSchema) });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: AddShiftType) => await updateShiftAction(data, id),
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
    watch,
  };
};

export default useUpdateShiftHandler;
