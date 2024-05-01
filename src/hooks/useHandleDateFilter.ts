import { usePathname, useRouter } from "next/navigation";

const useHandleDateFilter = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLastMonth = () => {
    const withoutParams = pathname.split("/");
    router.push(
      `${withoutParams[0]}/${withoutParams[1]}/${withoutParams[2]}/${
        parseInt(withoutParams[3]) - 1
      }`
    );
  };

  const handleNextMonth = () => {
    const withoutParams = pathname.split("/");
    router.push(
      `${withoutParams[0]}/${withoutParams[1]}/${withoutParams[2]}/${
        parseInt(withoutParams[3]) + 1
      }`
    );
  };

  return { handleLastMonth, handleNextMonth };
};

export default useHandleDateFilter;
