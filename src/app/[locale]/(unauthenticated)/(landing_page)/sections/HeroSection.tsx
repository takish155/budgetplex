import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section
      className="w-full h-[80vh] flex justify-center items-center p-4"
      id="hero-page"
    >
      <div>
        <h2 className="text-[min(10vw,3rem)] font-bold text-center mb-7 leading-10">
          {t.rich("title", {
            span: (text) => (
              <span className="lg:bg-primary lg:pb-3 lg:px-3 lg:rounded-xl lg:underline max-lg:text-primary">
                {text}
              </span>
            ),
          })}
        </h2>
        <p className="text-center text-[min(5vw,1.5rem)] mb-3">
          {t.rich("subtitle2", {
            title: (text) => (
              <span className="text-primary underline">{text}</span>
            ),
            i: (text) => <span className="italic underline">{text}</span>,
          })}
        </p>
        <p className="text-center text-[min(5vw,1.5rem)] mb-8">
          {t("subtitle")}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href={`/${locale}/auth/signup`} passHref>
            <Button size={"lg"}>{t("getStarted")}</Button>
          </Link>
          <Link href={`/${locale}/auth/signin`} passHref>
            <Button variant={"outline"} size={"lg"}>
              {t("signin")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
    // <section className="w-[95%] mx-auto max-w-[1000px] pt-[4rem] mb-8">
    //   <h2 className="text-header font-bold w-[50%] max-md:w-[80%] mb-4">
    //     {t("title")}
    //   </h2>
    //   <p className="text-paragraph mb-8">{t("subtitle")}</p>{" "}
    //   <div className="flex gap-4 flex-wrap">
    //     <Button size={"lg"}>{t("getStarted")}</Button>
    //     <Button variant={"outline"} size={"lg"}>
    //       {t("signin")}
    //     </Button>
    //   </div>
    // </section>
  );
};

export default HeroSection;
