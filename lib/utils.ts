import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (val: string) => {
  return val
    .split(" ")
    .map((e) => e[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
