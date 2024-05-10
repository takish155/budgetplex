import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import { caller } from "@/server";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  const locale = await getLocale();
  const isVerified = await caller.verification.isVerified();
  if (!session) redirect(`/${locale}/auth/signin`);
  if (!isVerified.isVerified) redirect(`/${locale}/verify`);

  return (
    <main className="flex justify-center">
      <div className="max-lg:hidden max-w-[185px] w-[25%] sticky top-0 mt-20">
        <AuthenticatedMenu />
      </div>
      <section className="w-[100%]">{children}</section>
    </main>
  );
};

export default layout;
