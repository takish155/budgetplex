"use client";

import { trpc } from "@/app/_trpc/client";
import FormField from "@/components/FormField";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import useUpdateUsernameHandler from "../hooks/useUpdateUsernameHandler";

const UpdateUsernameForm = () => {
  const { errors, handleSubmit, isPending, mutate, register } =
    useUpdateUsernameHandler();
  const t = useTranslations("SettingsPage");
  const { data, isLoading } = trpc.getUsername.useQuery();
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => mutate(data.username))}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Input
            {...register("username")}
            className="max-w-[500px] mb-4"
            defaultValue={data as string}
          />
          {errors.username && <p>{t(errors.username.message as any)}</p>}
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

export default UpdateUsernameForm;
