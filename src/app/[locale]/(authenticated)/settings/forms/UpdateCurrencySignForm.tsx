"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { useCurrencySign } from "@/context/CurrrencySignProvider";
import useUpdateCurrencySignHandler from "../hooks/useUpdateCurrencySignHandler";

const UpdateCurrencySignForm = () => {
  const { errors, handleSubmit, register, isPending, mutate } =
    useUpdateCurrencySignHandler();
  const t = useTranslations("SettingsPage");
  const currencySign = useCurrencySign();

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {!currencySign ? (
        <Spinner />
      ) : (
        <>
          <Input
            {...register("currencySign")}
            className="mb-4 max-w-[100px]"
            defaultValue={currencySign}
          />
          {errors.currencySign && (
            <p className="text-red-500">
              {t(errors.currencySign.message as any)}
            </p>
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

export default UpdateCurrencySignForm;
