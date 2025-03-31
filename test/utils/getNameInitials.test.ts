import { getNameInitials } from "../../src/utils/getNameInitials";

describe("getNameInitials", () => {
  it("should return initials for a single name", () => {
    expect(getNameInitials("Alice")).toBe("A");
  });

  it("should return initials for a full name", () => {
    expect(getNameInitials("Alice Johnson")).toBe("AJ");
  });

  it("should handle names with multiple spaces", () => {
    expect(getNameInitials("  Alice   Johnson  ")).toBe("AJ");
  });

  it("should return an empty string for an empty input", () => {
    expect(getNameInitials("")).toBe("");
  });

  it("should handle names with multiple words", () => {
    expect(getNameInitials("Alice Bob Charlie")).toBe("ABC");
  });

  it("should handle lowercase names and convert to uppercase initials", () => {
    expect(getNameInitials("alice johnson")).toBe("AJ");
  });

  it("should handle mixed-case names and normalize to uppercase initials", () => {
    expect(getNameInitials("aLiCe JoHnSoN")).toBe("AJ");
  });

  it("should handle single-character names", () => {
    expect(getNameInitials("A B C")).toBe("ABC");
  });
});
