import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../api";
import { Category, AddExpensePayload } from "../types";

const inputStyle = {
  width: "100%", padding: "14px", borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.07)", color: "white",
  fontSize: "1rem", outline: "none",
};

export default function AddExpensePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<AddExpensePayload>({
    title: "", amount: 0, category: Category.Food, note: "", date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense(form);
      setSuccess("Expense added successfully!");
      setError("");
      setForm({ title: "", amount: 0, category: Category.Food, note: "", date: "" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "30px",
        background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Add Expense
      </h1>

      <div style={{
        background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
        borderRadius: "16px", padding: "32px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {error && <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid #ef4444",
          borderRadius: "8px", padding: "12px", marginBottom: "16px", color: "#fca5a5" }}>{error}</div>}
        {success && <div style={{ background: "rgba(34,197,94,0.2)", border: "1px solid #22c55e",
          borderRadius: "8px", padding: "12px", marginBottom: "16px", color: "#86efac" }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Title *</label>
            <input style={inputStyle} placeholder="e.g. Grocery Run" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Amount *</label>
            <input style={inputStyle} type="number" step="0.01" placeholder="0.00" value={form.amount}
              onChange={e => setForm({ ...form, amount: parseFloat(e.target.value) })} required />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Category *</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value as Category })}>
              {Object.values(Category).map(c => <option key={c} value={c} style={{ background: "#1a1a2e" }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Date</label>
            <input style={inputStyle} type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Note (optional)</label>
            <input style={inputStyle} placeholder="Any additional notes..." value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })} />
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="button" onClick={() => navigate("/")} style={{
              flex: 1, padding: "14px", borderRadius: "10px", cursor: "pointer",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              color: "white", fontSize: "1rem",
            }}>Cancel</button>
            <button type="submit" style={{
              flex: 2, padding: "14px", borderRadius: "10px", cursor: "pointer",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              border: "none", color: "white", fontSize: "1rem", fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
            }}>➕ Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}