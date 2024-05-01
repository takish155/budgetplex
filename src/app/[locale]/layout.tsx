import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/global_component/header/Header";
import { cn } from "@/lib/utils";
import Footer from "@/global_component/Footer";
import QueryProvider from "@/context/QueryProvider";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider, useMessages } from "next-intl";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Budgetplex",
  description:
    "Budgetplex is a budgeting app that helps you manage your finances.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={cn("font-poppins")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <NextIntlClientProvider messages={messages}>
                <Header />
                {children}
                <Footer />
              </NextIntlClientProvider>
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
