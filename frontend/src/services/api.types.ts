export type TAPIErrors = {
  [error: string]: string;
};

export type TAPIError = {
  errors: TAPIErrors;
  statusCode: number;
};
