import React from "react";

const getLastMonth = () => {
  const date = new Date();

  date.setMonth(date.getMonth() - 1);
  return date.getMonth() + 1;
};

export default getLastMonth;
