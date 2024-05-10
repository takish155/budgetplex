"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import useSendResetPasswordEmail from "../hooks/useSendResetPasswordEmail";
import Spinner from "@/components/Spinner";

const ResetPasswordForm = () => {
  const t = useTranslations!("ResetPassword");
  const { errors, handleSubmit, isPending, mutate, register } =
    useSendResetPasswordEmail();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data.email))}>
      <FormField htmlFor="email" placeholder={t("email")}>
        <Input placeholder={t("email")} {...register("email")} />
        {errors?.email && (
          <p className="text-red-500 text-sm">{t("invalidEmailError")}</p>
        )}
      </FormField>
      {isPending ? <Spinner /> : <Button>{t("send")}</Button>}
    </form>
  );
};

export default ResetPasswordForm;
