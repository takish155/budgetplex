import MessageCard from "@/components/MessageCard";
import { useTranslations } from "next-intl";
import React from "react";
import ResetPasswordForm from "./forms/SendResetPasswordForm";

const page = () => {
  const t = useTranslations!("ResetPassword");
  return (
    <section>
      <MessageCard
        cardTitle={t("forgotPassword")}
        cardDescription={t("ForgotPasswordDescription")}
      >
        <ResetPasswordForm />
      </MessageCard>
    </section>
  );
};

export default page;
