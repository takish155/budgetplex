import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session) redirect(`/${locale}/dashboard`);

  return <main>{children}</main>;
};

export default layout;
