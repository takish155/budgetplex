"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import useUpdatePasswordHandler from "../hooks/useUpdatePasswordHandler";
import Spinner from "@/components/Spinner";

const UpdatePasswordForm = () => {
  const { errors, handleSubmit, isPending, mutate, register } =
    useUpdatePasswordHandler();
  const t = useTranslations("SettingsPage");

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      <FormField placeholder={t("currentPassword")} htmlFor="currentPassword">
        <Input type="password" {...register("currentPassword")} />
        {errors.currentPassword && (
          <p className="text-red-500">
            {t(errors.currentPassword.message as any)}
          </p>
        )}
      </FormField>
      <FormField placeholder={t("newPassword")} htmlFor="newPassword">
        <Input type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <p className="text-red-500">{t(errors.newPassword.message as any)}</p>
        )}
      </FormField>
      <FormField placeholder={t("confirmPassword")} htmlFor="confirmPassword">
        <Input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-red-500">
            {t(errors.confirmPassword.message as any)}
          </p>
        )}
      </FormField>
      {!isPending ? (
        <Button className="self-end" variant={"outline"}>
          {t("save")}
        </Button>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default UpdatePasswordForm;
