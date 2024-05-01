import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const locale = useLocale();
  redirect(`/${locale}/salary/1`);
};

export default Page;
