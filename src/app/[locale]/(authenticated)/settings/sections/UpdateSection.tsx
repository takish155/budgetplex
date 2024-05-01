import React from "react";
import UpdateSomething from "../UpdateCard";
import { useTranslations } from "next-intl";
import UpdateUsernameForm from "../forms/UpdateUsernameForm";
import UpdateEmailForm from "../forms/UpdateEmailForm";
import UpdatePasswordForm from "../forms/UpdatePasswordForm";

const UpdateSection = () => {
  const t = useTranslations("SettingsPage");
  return (
    <section>
      <UpdateSomething
        updateName={t("username")}
        updateDescription={t("usernameHelper")}
      >
        <UpdateUsernameForm />
      </UpdateSomething>
      <UpdateSomething
        updateName={t("email")}
        updateDescription={t("emailHelper")}
      >
        <UpdateEmailForm />
      </UpdateSomething>
      <UpdateSomething
        updateName={t("password")}
        updateDescription={t("passwordHelper")}
      >
        <UpdatePasswordForm />
      </UpdateSomething>
    </section>
  );
};

export default UpdateSection;
