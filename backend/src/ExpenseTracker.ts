import { Expense, AddExpensePayload, FilterOptions, Category } from "./types";
import { generateId, todayISO, isValidCategory, isValidAmount } from "./utils";

export class ExpenseTrackerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ExpenseTrackerError";
  }
}

export class ExpenseTracker {
  private expenses: Expense[] = [];

  addExpense(p: AddExpensePayload): Expense {
    if (!p.title || p.title.trim() === "")
      throw new ExpenseTrackerError("Title cannot be empty.");
    if (!isValidAmount(p.amount))
      throw new ExpenseTrackerError(`Invalid amount: ${p.amount}`);
    if (!isValidCategory(p.category))
      throw new ExpenseTrackerError(`Invalid category: ${p.category}`);

    const expense: Expense = {
      id: generateId(),
      title: p.title.trim(),
      amount: p.amount,
      category: p.category,
      date: p.date ?? todayISO(),
      ...(p.note ? { note: p.note.trim() } : {}),
    };
    this.expenses.push(expense);
    return expense;
  }

  deleteExpense(id: string): Expense {
    const i = this.expenses.findIndex((e) => e.id === id);
    if (i === -1) throw new ExpenseTrackerError(`No expense found: ${id}`);
    const [removed] = this.expenses.splice(i, 1);
    return removed;
  }

  getExpenses(f?: FilterOptions): Expense[] {
    let r = [...this.expenses];
    if (f?.category) r = r.filter((e) => e.category === f.category);
    if (f?.fromDate) r = r.filter((e) => e.date >= f.fromDate!);
    if (f?.toDate) r = r.filter((e) => e.date <= f.toDate!);
    return r.sort((a, b) => b.date.localeCompare(a.date));
  }

  getTotalSpent(f?: FilterOptions): number {
    return this.getExpenses(f).reduce((sum, e) => sum + e.amount, 0);
  }

  getSummaryByCategory(): Record<Category, number> {
    const s = Object.fromEntries(
      Object.values(Category).map((c) => [c, 0])
    ) as Record<Category, number>;
    this.expenses.forEach((e) => { s[e.category] += e.amount; });
    return s;
  }

  get count(): number { return this.expenses.length; }
}