export const dateToString = (
  date: Date,
  locale: string,
  monthYearOnly?: boolean
) => {
  if (monthYearOnly) {
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });
  }

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
