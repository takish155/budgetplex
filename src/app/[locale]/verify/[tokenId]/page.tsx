"use client";

import MessageCard from "@/components/MessageCard";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect } from "react";
import useVerifyTokenIdHandler from "./hooks/useVerifyTokenIdHandler";
import Spinner from "@/components/Spinner";

const Page = ({ params }: { params: { tokenId: string } }) => {
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

  if (data.status === "SUCCESS")
    <MessageCard cardTitle={t("errorTitle")} cardDescription={data.message} />;

  return <Spinner />;
};

export default Page;
