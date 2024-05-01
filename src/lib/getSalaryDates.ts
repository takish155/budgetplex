export const getSalaryDates = (
  startDay: number,
  month?: number,
  year?: number
) => {
  const startDate = new Date();
  const endDate = new Date();
  if (month && year) {
    startDate.setFullYear(year);
    startDate.setMonth(month - 1);
    endDate.setFullYear(year);
    endDate.setMonth(month - 1);
  }

  if (startDate.getDate() < startDay) {
    startDate.setMonth(startDate.getMonth() - 1);
  } else {
    endDate.setMonth(endDate.getMonth() + 1);
  }
  startDate.setDate(startDay);
  endDate.setDate(startDay - 1);

  return { startDate, endDate };
};
