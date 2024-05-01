import React, { ReactNode } from "react";
import { Label } from "./ui/label";

interface TextFieldProps {
  placeholder: string;
  htmlFor: string;
  children: ReactNode;
}

const FormField = ({ placeholder, htmlFor, children }: TextFieldProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mb-7">
      <Label htmlFor={htmlFor}>{placeholder}</Label>
      {children}
    </div>
  );
};

export default FormField;
