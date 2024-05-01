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
import SignUpForm from "./SignUpForm";

const page = () => {
  const t = useTranslations!("SignupPage");
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
              <SignUpForm
                username={t("username")}
                email={t("email")}
                password={t("password")}
                confirmPassword={t("confirmPassword")}
                signup={t("signup")}
              />
            </NextIntlClientProvider>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default page;
