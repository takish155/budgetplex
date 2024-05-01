"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import useUpdateEmailHandler from "../hooks/useUpdateEmailHandler";
import { UpdateErrors } from "../settingsType";

const UpdateEmailForm = () => {
  const { errors, handleSubmit, register, isPending, mutate } =
    useUpdateEmailHandler();
  const t = useTranslations("SettingsPage");
  const session = useSession();

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {session.status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <Input
            {...register("email")}
            className="mb-4 max-w-[500px]"
            defaultValue={session.data?.user?.email!}
          />
          {errors.email && (
            <p className="text-red-500">{t(errors.email.message as any)}</p>
          )}
        </>
      )}
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

export default UpdateEmailForm;
