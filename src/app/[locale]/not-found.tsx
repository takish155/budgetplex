import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  const t = useTranslations("Errors");
  return (
    <MessageCard
      cardTitle={t("404title")}
      cardDescription={t("404description")}
    >
      <Link href="/">
        <Button variant={"outline"}>{t("returnHome")}</Button>
      </Link>
    </MessageCard>
  );
};

export default NotFound;
