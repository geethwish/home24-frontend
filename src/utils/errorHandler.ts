// This  utility functions will  handling api request errors.
export const responseErrorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return (error as { message: string }).message;
  } else {
    return "An unknown error occurred";
  }
};
