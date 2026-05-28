import { Category } from "./types";

export const generateId = () =>
  `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const todayISO = () => new Date().toISOString().split("T")[0];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

export const isValidCategory = (value: string): value is Category =>
  Object.values(Category).includes(value as Category);

export const isValidAmount = (v: number) => Number.isFinite(v) && v > 0;