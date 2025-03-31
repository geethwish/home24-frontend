import { decodeToken } from "../../src/utils/jwt";
import { UserToken } from "../../src/types";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");

describe("decodeToken", () => {
  it("should return null if token is empty", () => {
    const result = decodeToken("");
    expect(result).toBeNull();
  });

  it("should decode the token if it is valid", () => {
    const mockToken = "valid.token.here";
    const mockDecodedToken: UserToken = { id: "123", name: "John Doe" };
    (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

    const result = decodeToken(mockToken);

    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    expect(result).toEqual(mockDecodedToken);
  });

  it("should return null and log an error if token is invalid", () => {
    const mockToken = "invalid.token.here";
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const result = decodeToken(mockToken);

    expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Invalid token",
      expect.any(Error)
    );
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });
});
