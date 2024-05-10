import {
  DollarSign,
  GanttChartSquareIcon,
  GoalIcon,
  HandCoinsIcon,
  LogOut,
  Settings,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import MobileMemberLinks from "./MobileMemberLinks";

const RenderMobileMemberLinks = () => {
  const t = useTranslations("AuthenticatedMenu");
  const locale = useLocale();

  const tools = [
    {
      name: t("transactions"),
      href: `/${locale}/dashboard`,
      icon: <HandCoinsIcon />,
    },
    {
      name: t("bills"),
      href: `/${locale}/bills`,
      icon: <GanttChartSquareIcon />,
    },
    {
      name: t("salary"),
      href: `/${locale}/salary/0`,
      icon: <DollarSign />,
    },
    {
      name: t("financialGoals"),
      href: `/${locale}/financial-goals`,
      icon: <GoalIcon />,
    },
  ];

  const account = [
    {
      name: t("setting"),
      href: `/${locale}/settings`,
      icon: <Settings />,
    },
  ];

  return (
    <menu>
      <MobileMemberLinks title={t("tools")} links={tools} />
      <MobileMemberLinks title={t("accountHeader")} links={account} />
    </menu>
  );
};

export default RenderMobileMemberLinks;
