import { getServerSession } from "next-auth";
import HeroSection from "./sections/HeroSection";
import IntroductionSection from "./sections/IntroductionSection";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session) redirect(`/${locale}/dashboard`);

  return (
    <main>
      <HeroSection />
      <IntroductionSection />
    </main>
  );
}
