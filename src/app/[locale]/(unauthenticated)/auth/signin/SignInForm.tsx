"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useSignInHandler from "@/hooks/useSignInHandler";
import { SignInErrors } from "@/schema/signInSchema";
import Spinner from "@/components/Spinner";

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
        <Label htmlFor="password">{password}</Label>
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
      {!isPending ? <Button type="submit">{signIn}</Button> : <Spinner />}
    </form>
  );
};

export default SignInForm;
