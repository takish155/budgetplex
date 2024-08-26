import Link from "next/link";
import React from "react";
import GuestNav from "./guest/GuestNav";
import { auth } from "@/auth";
import MemberNav from "./member/MemberNav";
import MobileSelectLanguage from "./MobileSelectLanguage";

const Header = async () => {
  const session = await auth();

  return (
    <header className="top-0 sticky flex justify-around z-50 w-full bg-background bg-opacity-40">
      <h1 className="font-semibold text-4xl py-6">
        <Link href="/">Budgetplex</Link>
      </h1>
      {session ? <MemberNav /> : <GuestNav />}
    </header>
  );
};

export default Header;
