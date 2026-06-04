import { Expense, Category } from "./types";
import { formatCurrency } from "./utils";

const SEP = "─".repeat(60);

export function printExpenses(expenses: Expense[], label = "Expenses"): void {
  console.log(`\n${SEP}`);
  console.log(` ${label.toUpperCase()}`);
  console.log(SEP);
  if (!expenses.length) { console.log("  (no expenses found)"); console.log(SEP); return; }
  expenses.forEach((e, i) => {
    console.log(`  ${i + 1}. ${e.date}  [${e.category}]  ${formatCurrency(e.amount)}  ${e.title}`);
    if (e.note) console.log(`     note: ${e.note}`);
    console.log(`     ID: ${e.id}`);
  });
  console.log(SEP);
}

export function printTotal(total: number, label = "Total Spent"): void {
  console.log(`  ${label}: ${formatCurrency(total)}`);
  console.log(SEP);
}

export function printCategorySummary(summary: Record<Category, number>): void {
  console.log(`\n${SEP}`);
  console.log(" SPENDING BY CATEGORY");
  console.log(SEP);
  const max = Math.max(...Object.values(summary));
  (Object.entries(summary) as [Category, number][]).forEach(([c, t]) => {
    const bar = "#".repeat(Math.round((t / Math.max(max, 1)) * 20));
    console.log(`  ${c.padEnd(15)} ${formatCurrency(t).padStart(10)}  ${bar}`);
  });
  console.log(SEP);
}

export const printSuccess = (msg: string) => console.log(`  OK: ${msg}`);
export const printError = (msg: string) => console.error(`  ERROR: ${msg}`);