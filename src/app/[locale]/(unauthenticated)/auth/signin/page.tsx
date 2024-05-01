import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import React from "react";
import SignInForm from "./SignInForm";
import { pick } from "lodash";

const page = () => {
  const t = useTranslations!("SigninPage");
  const messages = useMessages!();

  return (
    <main>
      <section className="w-[100vw] h-[90vh] flex justify-center items-center">
        <Card className="w-[50%] max-sm:w-[95%] max-w-[450px]">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <NextIntlClientProvider messages={messages}>
              <SignInForm
                username={t("username")}
                password={t("password")}
                signIn={t("signIn")}
              />
            </NextIntlClientProvider>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default page;
