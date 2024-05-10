"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";
import useResendVerificationHandler from "./hooks/useResendVerificationHandler";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResendVerification = () => {
  const t = useTranslations("VerificationPage");
  const router = useRouter();
  const { isPending, resendVerification } = useResendVerificationHandler();

  return (
    <section>
      {!isPending ? (
        <div className="flex gap-4">
          <Button onClick={() => resendVerification()}>
            {t("resnedVerification")}
          </Button>
          <Button onClick={() => router.refresh()}>{t("reloadPage")}</Button>
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default ResendVerification;
