import { ExpenseTracker, ExpenseTrackerError } from "./ExpenseTracker";
import { Category } from "./types";
import { printExpenses, printTotal, printCategorySummary, printSuccess, printError } from "./display";

const t = new ExpenseTracker();
console.log("\n================ EXPENSE TRACKER (TypeScript) ================");

try {
  const e1 = t.addExpense({ title: "Grocery Run", amount: 85.5, category: Category.Food, date: "2025-05-01", note: "Weekly groceries" });
  printSuccess(`Added: ${e1.title}`);
  const e2 = t.addExpense({ title: "Bus Pass", amount: 40, category: Category.Transport, date: "2025-05-03" });
  printSuccess(`Added: ${e2.title}`);
  const e3 = t.addExpense({ title: "Netflix", amount: 15.99, category: Category.Entertainment, date: "2025-05-05" });
  printSuccess(`Added: ${e3.title}`);
  const e4 = t.addExpense({ title: "Doctor Visit", amount: 120, category: Category.Health, date: "2025-05-07", note: "Annual checkup" });
  printSuccess(`Added: ${e4.title}`);
  const e5 = t.addExpense({ title: "Electricity Bill", amount: 95, category: Category.Bills, date: "2025-05-10" });
  printSuccess(`Added: ${e5.title}`);

  printExpenses(t.getExpenses(), "All Expenses");
  printTotal(t.getTotalSpent(), "Grand Total");

  printExpenses(t.getExpenses({ category: Category.Food }), "Food Only");
  printTotal(t.getTotalSpent({ category: Category.Food }), "Food Total");

  const deleted = t.deleteExpense(e3.id);
  printSuccess(`Deleted: ${deleted.title}`);

  printExpenses(t.getExpenses(), `After Deletion (${t.count} remaining)`);
  printTotal(t.getTotalSpent(), "New Total");

  printCategorySummary(t.getSummaryByCategory());

} catch (err) {
  if (err instanceof ExpenseTrackerError) printError(err.message);
  else throw err;
}

console.log("\n--- ERROR HANDLING DEMOS ---");
try { t.addExpense({ title: "Bad", amount: -5, category: Category.Food }); }
catch (e) { if (e instanceof ExpenseTrackerError) printError(e.message); }

try { t.addExpense({ title: "  ", amount: 10, category: Category.Food }); }
catch (e) { if (e instanceof ExpenseTrackerError) printError(e.message); }

try { t.deleteExpense("fake_id"); }
catch (e) { if (e instanceof ExpenseTrackerError) printError(e.message); }

console.log("\n  Done!\n");