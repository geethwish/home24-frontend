export function getNameInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  const initials = words.map((word) => word[0].toUpperCase()).join("");

  return initials;
}
