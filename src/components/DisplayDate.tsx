import React from "react";

interface DisplayDateProps {
  heading: string;
  date: Date;
}

const DisplayDate = ({ date, heading }: DisplayDateProps) => {
  return (
    <div>
      <h3 className="text-paragraph font-light">{heading}</h3>
      <h3 className="text-miniheader font-bold">{date.toLocaleDateString()}</h3>
    </div>
  );
};

export default DisplayDate;
