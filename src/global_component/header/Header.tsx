import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import ThemeButton from "./guest/pc/ThemeButton";
import LanguageButton from "./guest/pc/LanguageButton";
import Nav from "./guest/pc/Nav";
import MenuBarButton from "./guest/mobile/MenuBarButton";
import MobileMenu from "./guest/mobile/MobileMenu";
import { getLocale, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import SignOutButton from "./member/SignOutButton";
import { SettingsIcon } from "lucide-react";
import MobileSessionMenu from "./member/MobileSessionMenu";

const Header = async () => {
  const t = await getTranslations("Header");
  const session = await getServerSession();
  const locale = await getLocale();

  return (
    <>
      <Card className="max-h-[12vh] top-0 sticky z-50">
        <header
          className="flex items-center gap-10 justify-around h-[12vh]"
          id="header"
        >
          {session ? <MobileSessionMenu /> : null}
          <div className="flex items-center gap-10">
            <Link href="/">
              <h1 className="font-semibold text-4xl">Budgetplex</h1>
            </Link>

            {!session && (
              <Nav
                home={t("home")}
                login={t("login")}
                register={t("register")}
              />
            )}
          </div>
          <div className="flex gap-5 max-[800px]:hidden">
            {!session ? (
              <>
                <Link passHref href={`/${locale}/auth/signup`}>
                  <Button size={"lg"}>{t("try")}</Button>
                </Link>
                <ThemeButton />
                <LanguageButton />
              </>
            ) : (
              <>
                {session?.user?.email}
                <SignOutButton />
                <Link passHref href={"/settings"}>
                  <SettingsIcon />
                  <p className="sr-only">{t("settings")}</p>
                </Link>
              </>
            )}
          </div>
          {!session && (
            <div className="min-[800px]:hidden">
              <MenuBarButton />
            </div>
          )}
        </header>
        <MobileMenu
          login={t("login")}
          register={t("register")}
          home={t("home")}
        />
      </Card>
    </>
  );
};

export default Header;
