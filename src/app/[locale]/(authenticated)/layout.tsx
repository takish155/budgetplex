import React, { ReactNode } from "react";
import AuthenticatedMenu from "./AuthenticatedMenu";
import { CurrencySignProvider } from "@/context/CurrrencySignProvider";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex justify-center">
      <div className="max-lg:hidden max-w-[185px] w-[25%] sticky top-0 mt-20">
        <AuthenticatedMenu />
      </div>
      <CurrencySignProvider>
        <section className="w-[100%]">{children}</section>
      </CurrencySignProvider>
    </main>
  );
};

export default layout;
