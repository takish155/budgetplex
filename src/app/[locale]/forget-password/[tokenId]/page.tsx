import React from "react";
import MessageCard from "@/components/MessageCard";
import { caller } from "@/server";
import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "../forms/ResetPasswordForm";

const Page = async ({ params }: { params: { tokenId: string } }) => {
  const data = await caller.verification.verifyResetPasswordToken(
    params.tokenId
  );
  const t = await getTranslations("ResetPassword");
  if (data?.status === "ERROR") {
    return (
      <MessageCard
        cardTitle={t("tokenInvalidError")}
        cardDescription={data.message}
      />
    );
  }
  if (data?.status === "SUCCESS") {
    return (
      <MessageCard
        cardTitle={t("resetPassword")}
        cardDescription={t("resetPasswordDescription")}
      >
        <ResetPasswordForm tokenId={params.tokenId} userId={data.message} />
      </MessageCard>
    );
  }
};

export default Page;
