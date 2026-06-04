import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, getTotal, getSummary } from "../api";
import { Expense, Category } from "../types";

const card = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid rgba(255,255,255,0.1)",
  marginBottom: "24px",
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState<Record<Category, number>>({} as any);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getExpenses(), getTotal(), getSummary()]).then(([e, t, s]) => {
      setExpenses(e); setTotal(t); setSummary(s);
    });
  }, []);

  const max = Math.max(...Object.values(summary), 1);
  const recent = expenses.slice(0, 5);

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "30px",
        background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Dashboard
      </h1>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Spent", value: `$${total.toFixed(2)}`, icon: "💰" },
          { label: "Total Expenses", value: expenses.length, icon: "📝" },
          { label: "Categories Used", value: Object.values(summary).filter(v => v > 0).length, icon: "📂" },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: "2rem" }}>{icon}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#a78bfa" }}>{value}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Category Summary */}
      <div style={card}>
        <h2 style={{ marginBottom: "20px", color: "#a78bfa" }}>Spending by Category</h2>
        {(Object.entries(summary) as [Category, number][]).map(([cat, amount]) => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ width: "110px", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>{cat}</span>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "6px", height: "10px" }}>
              <div style={{
                width: `${(amount / max) * 100}%`, height: "100%", borderRadius: "6px",
                background: "linear-gradient(90deg, #7c3aed, #3b82f6)", transition: "width 0.5s"
              }} />
            </div>
            <span style={{ width: "70px", textAlign: "right", fontSize: "0.9rem", color: "#60a5fa" }}>
              ${amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Expenses */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ color: "#a78bfa" }}>Recent Expenses</h2>
          <button onClick={() => navigate("/history")} style={{
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            border: "none", color: "white", padding: "8px 16px",
            borderRadius: "20px", cursor: "pointer", fontSize: "0.85rem"
          }}>View All</button>
        </div>
        {recent.length === 0 && <p style={{ color: "rgba(255,255,255,0.5)" }}>No expenses yet.</p>}
        {recent.map(e => (
          <div key={e.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px", borderRadius: "10px", marginBottom: "8px",
            background: "rgba(255,255,255,0.05)",
          }}>
            <div>
              <div style={{ fontWeight: "600" }}>{e.title}</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{e.date} · {e.category}</div>
            </div>
            <span style={{ color: "#a78bfa", fontWeight: "bold" }}>${e.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => navigate("/add")} style={{
          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
          border: "none", color: "white", padding: "14px 40px",
          borderRadius: "30px", cursor: "pointer", fontSize: "1.1rem",
          fontWeight: "bold", boxShadow: "0 4px 20px rgba(124,58,237,0.4)"
        }}>➕ Add New Expense</button>
      </div>
    </div>
  );
}