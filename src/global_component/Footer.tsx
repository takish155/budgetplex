"use client";

import { Card } from "@/components/ui/card";
import { createCipheriv } from "crypto";
import { useSession } from "next-auth/react";
import React from "react";

const Footer = () => {
  const session = useSession();

  if (session.status === "loading" || session.status === "authenticated")
    return <div className="pt-20"></div>;

  return (
    <Card className="w-full p-8 mt-20">
      <footer>
        <p className="text-center text-xl">
          © 2024 Budgetplex, all rights reserve
        </p>
      </footer>
    </Card>
  );
};

export default Footer;
