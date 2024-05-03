"use client";

import Spinner from "@/components/Spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignUpHandler from "@/hooks/useSignUpHandler";
import { SignUpError } from "@/schema/signUpSchema";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import React from "react";

const SignUpForm = ({
  username,
  email,
  password,
  confirmPassword,
  signup,
}: {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  signup: string;
}) => {
  const { errors, formStatus, handleSubmit, submitHandler, register } =
    useSignUpHandler();
  const t = useTranslations("SignupPage");

  return (
    <form onSubmit={handleSubmit((data) => submitHandler(data))}>
      {formStatus.message && (
        <Alert
          variant={formStatus.status === "ERROR" ? "destructive" : "default"}
          className="mb-5"
        >
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="username">{username}</Label>
        <Input id="username" placeholder={username} {...register("username")} />
        {errors.username && (
          <p className="text-red-500 text-sm">
            {t(errors.username.message as SignUpError)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="email">{email}</Label>
        <Input id="email" placeholder={email} {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {t(errors.email.message as SignUpError)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="password">{password}</Label>
        <Input
          id="password"
          placeholder={password}
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {t(errors.password.message as SignUpError)}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
        <Label htmlFor="confirmPassword">{confirmPassword}</Label>
        <Input
          id="confirmPassword"
          placeholder={confirmPassword}
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {t(errors.confirmPassword.message as SignUpError)}
          </p>
        )}
      </div>
      {formStatus.status !== "LOADING" ? (
        <Button type="submit">{t("signup")}</Button>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default SignUpForm;
