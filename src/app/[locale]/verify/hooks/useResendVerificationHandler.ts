import resendVerificationTokenAction from "@/app/api/user/verification/resendVerificationTokenAction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useResendVerificationHandler = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => await resendVerificationTokenAction(),
    onSettled: (res) => {
      if (res?.status === "ERROR") {
        toast.error(res.message);
      }
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
      }
    },
  });

  return { isPending, resendVerification: mutate };
};

export default useResendVerificationHandler;
