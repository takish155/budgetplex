"use client";

import verifyVerifactionTokenAction from "@/app/api/user/verification/verifyVerifactionTokenAction";
import MessageCard from "@/components/MessageCard";
import { getServerSession } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import useVerifyTokenIdHandler from "./hooks/useVerifyTokenIdHandler";
import Spinner from "@/components/Spinner";

const Page = ({ params }: { params: { tokenId: string } }) => {
  const locale = useLocale!();
  const t = useTranslations!("VerificationPage");

  const { data, isPending, verifyTokenId } = useVerifyTokenIdHandler();

  useEffect(() => {
    verifyTokenId(params.tokenId);
  }, [params.tokenId, verifyTokenId]);

  if (!data?.status || isPending) {
    return <Spinner />;
  }

  if (data.status === "ERROR") {
    return (
      <MessageCard cardTitle={t("errorTitle")} cardDescription={data.message} />
    );
  }

  if (data.status === "SUCCESS") redirect(`/${locale}/dashboard`);
};

export default Page;
