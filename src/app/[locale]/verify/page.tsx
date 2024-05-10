import MessageCard from "@/components/MessageCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { caller } from "@/server";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";
import ResendVerification from "./ResendVerification";

const page = async () => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/auth/signin`);

  const response = await caller.verification.isVerified();
  if (response.isVerified) {
    redirect(`/${locale}/dashboard`);
  }

  const t = await getTranslations("VerificationPage");

  return (
    <section>
      <MessageCard
        cardTitle={t("title")}
        cardDescription={t("description", { email: session?.user?.email })}
      >
        <ResendVerification />
      </MessageCard>
    </section>
  );
};

export default page;
