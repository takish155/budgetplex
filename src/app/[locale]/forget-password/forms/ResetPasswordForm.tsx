"use client";

import React from "react";
import useResetPasswordHandler from "../hooks/useResetPasswordHandler";
import FormField from "@/components/FormField";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetPasswordType } from "../schema/resetPasswordSchema";
import Spinner from "@/components/Spinner";

const ResetPasswordForm = ({
  tokenId,
  userId,
}: {
  tokenId: string;
  userId: string;
}) => {
  const { errors, handleSubmit, isPending, mutate, register } =
    useResetPasswordHandler(tokenId, userId);
  const t = useTranslations("ResetPassword");
  const inputErrorT = useTranslations("SignupPage");

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <FormField htmlFor="password" placeholder={t("password")}>
        <Input
          type="password"
          placeholder={t("password")}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {inputErrorT(errors.password.message as ResetPasswordType)}
          </p>
        )}
      </FormField>
      <FormField htmlFor="confirmPassword" placeholder={t("confirmPassword")}>
        <Input
          type="password"
          placeholder={t("confirmPassword")}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {inputErrorT(errors.confirmPassword.message as ResetPasswordType)}
          </p>
        )}
      </FormField>
      {isPending ? <Spinner /> : <Button>{t("submit")}</Button>}
    </form>
  );
};

export default ResetPasswordForm;
