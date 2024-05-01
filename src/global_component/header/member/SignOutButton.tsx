"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const SignOutButton = () => {
  const t = useTranslations("Header");
  return (
    <button onClick={() => signOut()}>
      <LogOutIcon />
      <p className="sr-only">{t("signOut")}</p>
    </button>
  );
};

export default SignOutButton;
