import { responseErrorHandler } from "../../src/utils/errorHandler";

describe("responseErrorHandler", () => {
  it("should return the error message if the error is an instance of Error", () => {
    const error = new Error("Test error message");
    const result = responseErrorHandler(error);
    expect(result).toBe("Test error message");
  });

  it("should return the message property if the error is an object with a message property", () => {
    const error = { message: "Object error message" };
    const result = responseErrorHandler(error);
    expect(result).toBe("Object error message");
  });

  it("should return 'An unknown error occurred' if the error is null", () => {
    const error = null;
    const result = responseErrorHandler(error);
    expect(result).toBe("An unknown error occurred");
  });

  it("should return 'An unknown error occurred' if the error is undefined", () => {
    const error = undefined;
    const result = responseErrorHandler(error);
    expect(result).toBe("An unknown error occurred");
  });

  it("should return 'An unknown error occurred' if the error is a primitive value", () => {
    const error = "Some string";
    const result = responseErrorHandler(error);
    expect(result).toBe("An unknown error occurred");
  });

  it("should return 'An unknown error occurred' if the error is an object without a message property", () => {
    const error = { code: 500 };
    const result = responseErrorHandler(error);
    expect(result).toBe("An unknown error occurred");
  });
});
