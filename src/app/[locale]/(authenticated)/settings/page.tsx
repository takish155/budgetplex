import { useTranslations } from "next-intl";
import React from "react";
import dynamic from "next/dynamic";
import UpdateSectionSkeleton from "./UpdateSectionSkeleton";

const UpdateSection = dynamic(() => import("./sections/UpdateSection"), {
  loading: () => <UpdateSectionSkeleton />,
});

const SettingPage = () => {
  const t = useTranslations("SettingsPage");
  return (
    <article className="w-[95%] mx-auto mt-8">
      <h2 className="text-miniheader font-semibold mb-8">{t("title")}</h2>
      <UpdateSection />
    </article>
  );
};

export default SettingPage;
