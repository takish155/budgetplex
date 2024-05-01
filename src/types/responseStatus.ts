export type ResponseStatus = {
  message: string;
  status: "IDLE" | "ERROR" | "SUCCESS" | "LOADING";
};
