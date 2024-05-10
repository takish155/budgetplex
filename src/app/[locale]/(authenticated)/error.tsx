"use client";

import MessageCard from "@/components/MessageCard";
import { useTranslations } from "next-intl";
import React from "react";

const Error = ({ error }: { error: Error }) => {
  const t = useTranslations("Errors");

  return (
    <MessageCard
      cardTitle={t("errorTitle")}
      cardDescription={t("errorDescription")}
    >
      <p className="font-semibold italic">{error.message}</p>
    </MessageCard>
  );
};

export default Error;
