import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import React from "react";

const IntroductionSection = () => {
  const t = useTranslations("Home");
  return (
    <section className="p-4">
      <section className="flex flex-wrap justify-center items-center gap-5 mb-10">
        <h2 className="text-[min(5vw,1.75rem)] font-semibold">{t("whats")}</h2>
        <p className="text-center text-[min(4vw,1.25rem)]">{t("ans")}</p>
      </section>
      <section className="flex gap-10 justify-around flex-wrap">
        <Card className="w-[30%] max-sm:w-[95%] max-lg:w-[45%] rounded-[22px]">
          <CardHeader>
            <CardTitle>{t("whats1")}</CardTitle>
          </CardHeader>
          <CardContent>{t("ans1")}</CardContent>
        </Card>
        <Card className="w-[30%] max-sm:w-[95%] max-lg:w-[45%] rounded-[22px]">
          <CardHeader>
            <CardTitle>{t("whats2")}</CardTitle>
          </CardHeader>
          <CardContent>{t("ans2")}</CardContent>
        </Card>
        <Card className="w-[30%] max-sm:w-[95%] max-lg:w-[45%] rounded-[22px]">
          <CardHeader>
            <CardTitle>{t("whats3")}</CardTitle>
          </CardHeader>
          <CardContent>{t("ans3")}</CardContent>
        </Card>
        <Card className="w-[30%] max-sm:w-[95%] max-lg:w-[45%] rounded-[22px]">
          <CardHeader>
            <CardTitle>{t("whats4")}</CardTitle>
          </CardHeader>
          <CardContent>{t("ans4")}</CardContent>
        </Card>
      </section>
    </section>
  );
};

export default IntroductionSection;
