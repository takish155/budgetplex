"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useSignInHandler from "@/hooks/useSignInHandler";
import { SignInErrors } from "@/schema/signInSchema";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const SignInForm = ({
  username,
  password,
  signIn,
}: {
  username: string;
  password: string;
  signIn: string;
}) => {
  const { register, errors, handleSubmit, mutate, isPending, formStatus } =
    useSignInHandler();
  const t = useTranslations("SigninPage");
  const locale = useLocale();

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      {formStatus.message && (
        <Alert
          variant={formStatus.status === "ERROR" ? "destructive" : "default"}
          className="mb-5"
        >
          <AlertDescription>
            {t(formStatus.message as SignInErrors)}
          </AlertDescription>
        </Alert>
      )}
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="username">{username}</Label>
        <Input id="username" placeholder={username} {...register("username")} />
        {errors.username && (
          <p className="text-red-500 text-sm">
            {t(errors.username.message as SignInErrors)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="password" className="flex justify-between">
          {password}
        </Label>
        <Input
          id="password"
          placeholder={password}
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {t(errors.password.message as SignInErrors)}
          </p>
        )}
      </div>
      <div className="flex justify-between">
        {!isPending ? <Button type="submit">{signIn}</Button> : <Spinner />}
        <Link href={`/${locale}/forget-password`} className="text-end" passHref>
          <Button variant={"link"} type="button">
            {t("forgotPassword")}
          </Button>
        </Link>
      </div>
      <Link
        href={`/${locale}/auth/signup`}
        passHref
        className="flex justify-end mt-4"
      >
        <Button variant={"link"} type="button">
          {t("signUp")}
        </Button>
      </Link>
    </form>
  );
};

export default SignInForm;
