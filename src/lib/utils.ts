import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function updateItemById<T extends { readonly id: string }>(
  items: readonly T[],
  id: string,
  updater: (item: T) => T
): readonly T[] {
  return items.map((item) => (item.id === id ? updater(item) : item));
}

export function toggleSetItem(
  items: readonly string[],
  target: string
): readonly string[] {
  return items.includes(target)
    ? items.filter((item) => item !== target)
    : [...items, target];
}
