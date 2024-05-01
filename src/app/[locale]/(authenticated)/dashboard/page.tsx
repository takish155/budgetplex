import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

const page = () => {
  const locale = useLocale!();
  redirect(`/${locale}/dashboard/0`);
};

export default page;
