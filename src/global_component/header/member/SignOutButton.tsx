"use client";

import { signOutAction } from "@/app/api/auth/signOutAction";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const t = useTranslations("Header");
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOutAction();
        router.push("/auth/signin");
      }}
    >
      <LogOutIcon />
      <p className="sr-only">{t("signOut")}</p>
    </button>
  );
};

export default SignOutButton;
