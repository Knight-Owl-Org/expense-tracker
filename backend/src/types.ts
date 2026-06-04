export enum Category {
  Food = "Food",
  Transport = "Transport",
  Entertainment = "Entertainment",
  Health = "Health",
  Shopping = "Shopping",
  Bills = "Bills",
  Other = "Other",
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

export type AddExpensePayload = Omit<Expense, "id" | "date"> & { date?: string };

export interface FilterOptions {
  category?: Category;
  fromDate?: string;
  toDate?: string;
}