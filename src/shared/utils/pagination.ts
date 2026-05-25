import { FIRST_PAGE } from "@/shared/constants/api";

export function normalizePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : FIRST_PAGE;
}
