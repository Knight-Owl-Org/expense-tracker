import { useState } from "react";
import { addExpense } from "../api";
import { Category, AddExpensePayload } from "../types";

interface Props { onAdd: () => void; }

export default function AddExpense({ onAdd }: Props) {
  const [form, setForm] = useState<AddExpensePayload>({
    title: "", amount: 0, category: Category.Food, note: "", date: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense(form);
      setForm({ title: "", amount: 0, category: Category.Food, note: "", date: "" });
      setError("");
      onAdd();
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input type="number" placeholder="Amount" value={form.amount}
          onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })} required />
        <select value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value as Category })}>
          {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="date" value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Note (optional)" value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })} />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}