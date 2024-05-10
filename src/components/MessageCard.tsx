import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const MessageCard = ({
  cardTitle,
  cardDescription,
  children,
}: {
  cardTitle: string;
  cardDescription: string;
  children?: ReactNode;
}) => {
  return (
    <Card className="max-w-[800px] w-[95%] mx-auto mt-[10vh]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>
          <p>{cardDescription}</p>
        </CardDescription>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default MessageCard;
