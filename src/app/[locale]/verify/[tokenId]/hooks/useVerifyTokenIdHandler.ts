import verifyVerifactionTokenAction from "@/app/api/user/verification/verifyVerifactionTokenAction";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useVerifyTokenIdHandler = () => {
  const router = useRouter();
  const locale = useLocale();

  const { mutate, isPending, data } = useMutation({
    mutationFn: async (tokenid: string) =>
      await verifyVerifactionTokenAction(tokenid),
    onSettled: (res) => {
      if (res?.status === "SUCCESS") {
        toast.success(res.message);
        router.push(`/${locale}/auth/signin`);
      }
    },
  });

  return { verifyTokenId: mutate, isPending, data };
};

export default useVerifyTokenIdHandler;
