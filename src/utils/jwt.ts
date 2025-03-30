import { jwtDecode } from "jwt-decode";
import { UserToken } from "../types";

export const decodeToken = (token: string): UserToken | null => {
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
