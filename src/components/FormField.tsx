import React, { ReactNode } from "react";
import { Label } from "./ui/label";

interface TextFieldProps {
  placeholder: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

const FormField = ({
  placeholder,
  htmlFor,
  children,
  className,
}: TextFieldProps) => {
  return (
    <div
      className={`grid w-full max-w-sm items-center gap-1.5 mb-7 ${className}`}
    >
      <Label htmlFor={htmlFor}>{placeholder}</Label>
      {children}
    </div>
  );
};

export default FormField;
