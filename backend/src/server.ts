import express from "express";
import cors from "cors";
import { ExpenseTracker, ExpenseTrackerError } from "./ExpenseTracker";
import { Category, AddExpensePayload } from "./types";

const app = express();
const tracker = new ExpenseTracker();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all expenses
app.get("/api/expenses", (req, res) => {
  const { category, fromDate, toDate } = req.query;
  const expenses = tracker.getExpenses({
    category: category as Category | undefined,
    fromDate: fromDate as string | undefined,
    toDate: toDate as string | undefined,
  });
  res.json(expenses);
});

// GET total spent
app.get("/api/expenses/total", (req, res) => {
  const { category } = req.query;
  const total = tracker.getTotalSpent({
    category: category as Category | undefined,
  });
  res.json({ total });
});

// GET category summary
app.get("/api/expenses/summary", (req, res) => {
  const summary = tracker.getSummaryByCategory();
  res.json(summary);
});

// POST add expense
app.post("/api/expenses", (req, res) => {
  try {
    const payload: AddExpensePayload = req.body;
    const expense = tracker.addExpense(payload);
    res.status(201).json(expense);
  } catch (err) {
    if (err instanceof ExpenseTrackerError) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// DELETE expense
app.delete("/api/expenses/:id", (req, res) => {
  try {
    const deleted = tracker.deleteExpense(req.params.id);
    res.json(deleted);
  } catch (err) {
    if (err instanceof ExpenseTrackerError) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});