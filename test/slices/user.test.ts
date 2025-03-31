import {
  userSlice,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  validateToken,
} from "../../src/redux/slices/user.slice";
import { decodeToken } from "../../src/utils/jwt";
import { UserToken } from "../../src/types";

jest.mock("../../src/utils/jwt", () => ({
  decodeToken: jest.fn(),
}));

Object.defineProperty(window.localStorage, "getItem", {
  value: jest.fn(),
  writable: true,
});

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe("userSlice", () => {
  const initialState = {
    isLoggedIn: false,
    userDetails: null,
    loading: false,
    error: null,
  };

  it("should handle loginStart", () => {
    const nextState = userSlice.reducer(initialState, loginStart());
    expect(nextState).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it("should handle loginSuccess", () => {
    const mockToken = "mockToken";
    const mockUserDetails: UserToken = {
      id: "1",
      name: "John Doe",
      user: "johndoe",
      iat: 1234567890,
      exp: 1234567890,
    };
    (decodeToken as jest.Mock).mockReturnValue(mockUserDetails);

    const nextState = userSlice.reducer(
      initialState,
      loginSuccess({ token: mockToken })
    );

    expect(decodeToken).toHaveBeenCalledWith(mockToken);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "userDetails",
      JSON.stringify(mockUserDetails)
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoggedIn: true,
      userDetails: mockUserDetails,
      loading: false,
      error: null,
    });
  });

  it("should handle loginFailure", () => {
    const errorMessage = "Invalid credentials";
    const nextState = userSlice.reducer(
      initialState,
      loginFailure(errorMessage)
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoggedIn: false,
      userDetails: null,
      loading: false,
      error: errorMessage,
    });
  });

  it("should handle logout", () => {
    const loggedInState = {
      ...initialState,
      isLoggedIn: true,
      userDetails: {
        id: "1",
        name: "John Doe",
        user: "johndoe",
        iat: 1234567890,
        exp: 1234567890,
      },
    };

    const nextState = userSlice.reducer(loggedInState, logout());
    expect(localStorage.clear).toHaveBeenCalled();
    expect(nextState).toEqual(initialState);
  });

  it("should handle validateToken with valid token", () => {
    const mockToken = "mockToken";
    const mockUserDetails: UserToken = { id: "1", name: "John Doe" };
    (decodeToken as jest.Mock).mockReturnValue(mockUserDetails);
    localStorage.setItem("authToken", mockToken);

    const nextState = userSlice.reducer(initialState, validateToken());
    expect(decodeToken).toHaveBeenCalledWith(mockToken);
    expect(nextState).toEqual({
      ...initialState,
      isLoggedIn: true,
      userDetails: mockUserDetails,
    });
  });

  it("should handle validateToken with invalid token", () => {
    (decodeToken as jest.Mock).mockReturnValue(null);
    localStorage.setItem("authToken", "invalidToken");

    const nextState = userSlice.reducer(initialState, validateToken());
    expect(decodeToken).toHaveBeenCalledTimes(3);
    expect(nextState).toEqual(initialState);
  });
});
