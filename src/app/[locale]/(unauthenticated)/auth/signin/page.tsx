import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMessages, useTranslations } from "next-intl";
import React from "react";
import SignInForm from "./SignInForm";

const page = () => {
  const t = useTranslations!("SigninPage");

  return (
    <main>
      <section className="w-[100vw] h-[90vh] flex justify-center items-center">
        <Card className="w-[50%] max-sm:w-[95%] max-w-[450px]">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm
              username={t("username")}
              password={t("password")}
              signIn={t("signIn")}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default page;
