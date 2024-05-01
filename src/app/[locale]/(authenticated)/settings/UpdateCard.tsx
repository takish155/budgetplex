import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

const UpdateSomething = ({
  children,
  updateName,
  updateDescription,
}: {
  children: ReactNode;
  updateName: string;
  updateDescription: string;
}) => {
  return (
    <Card className="max-w-[700px] mb-8">
      <CardHeader>
        <CardTitle>{updateName}</CardTitle>
        <CardDescription>{updateDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default UpdateSomething;
