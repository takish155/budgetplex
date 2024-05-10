export const getMinutes = (targetDate: Date) => {
  // Create a Date object for the current time
  const now = new Date();

  // Create a Date object for the target date
  const target = new Date(targetDate);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = target.getTime() - now.getTime();

  // Convert milliseconds to minutes and seconds
  const minutesLeft = Math.floor(differenceInMilliseconds / 60000);

  return `${minutesLeft + 1} ${minutesLeft + 1 === 1 ? "minute" : "minutes"}`;
};
