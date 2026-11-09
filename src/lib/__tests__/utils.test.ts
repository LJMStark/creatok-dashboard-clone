import { describe, expect, it } from "vitest";
import { cn, toggleSetItem, updateItemById } from "@/lib/utils";

describe("utils immutable helpers", () => {
  it("merges tailwind classes cleanly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("updates item by id without mutating original array or items", () => {
    const original = Object.freeze([
      Object.freeze({ id: "1", count: 1 }),
      Object.freeze({ id: "2", count: 2 }),
    ]);

    const updated = updateItemById(original, "2", (item) => ({
      ...item,
      count: item.count + 10,
    }));

    expect(updated).not.toBe(original);
    expect(updated[1].count).toBe(12);
    expect(original[1].count).toBe(2);
    expect(updated[0]).toBe(original[0]);
  });

  it("toggles string item in list immutably", () => {
    const initial = Object.freeze(["a", "b"]);
    const added = toggleSetItem(initial, "c");
    expect(added).toEqual(["a", "b", "c"]);
    expect(initial).toEqual(["a", "b"]);

    const removed = toggleSetItem(added, "a");
    expect(removed).toEqual(["b", "c"]);
  });
});
