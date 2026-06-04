import { useEffect, useState } from "react";
import { getExpenses, deleteExpense, getTotal } from "../api";
import { Expense, Category } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f59e0b", Transport: "#3b82f6", Entertainment: "#ec4899",
  Health: "#10b981", Shopping: "#f97316", Bills: "#ef4444", Other: "#8b5cf6",
};

export default function History() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<Category | "">("");
  const [total, setTotal] = useState(0);

  const refresh = async () => {
    const cat = filter as Category | undefined;
    const [e, t] = await Promise.all([getExpenses(cat || undefined), getTotal(cat || undefined)]);
    setExpenses(e); setTotal(t);
  };

  useEffect(() => { refresh(); }, [filter]);

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    refresh();
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "30px",
        background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Expense History
      </h1>

      {/* Filter + Total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(255,255,255,0.07)", borderRadius: "12px",
        padding: "16px 20px", marginBottom: "20px",
        border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Filter:</span>
          <select value={filter} onChange={e => setFilter(e.target.value as Category | "")}
            style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.07)", color: "white", cursor: "pointer", outline: "none" }}>
            <option value="" style={{ background: "#1a1a2e" }}>All Categories</option>
            {Object.values(Category).map(c => <option key={c} value={c} style={{ background: "#1a1a2e" }}>{c}</option>)}
          </select>
        </div>
        <div style={{ color: "#a78bfa", fontWeight: "bold", fontSize: "1.1rem" }}>
          Total: ${total.toFixed(2)}
        </div>
      </div>

      {/* Expense List */}
      {expenses.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px",
          background: "rgba(255,255,255,0.05)", borderRadius: "16px",
          color: "rgba(255,255,255,0.4)" }}>
          No expenses found.
        </div>
      )}

      {expenses.map(e => (
        <div key={e.id} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(255,255,255,0.07)", borderRadius: "12px",
          padding: "16px 20px", marginBottom: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "transform 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "10px", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
              background: `${CATEGORY_COLORS[e.category]}22`,
              border: `1px solid ${CATEGORY_COLORS[e.category]}44`,
            }}>
              {e.category === "Food" ? "🍔" : e.category === "Transport" ? "🚌" :
               e.category === "Entertainment" ? "🎬" : e.category === "Health" ? "💊" :
               e.category === "Shopping" ? "🛍️" : e.category === "Bills" ? "📄" : "📦"}
            </div>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>{e.title}</div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{
                  fontSize: "0.75rem", padding: "2px 10px", borderRadius: "12px",
                  background: `${CATEGORY_COLORS[e.category]}33`,
                  color: CATEGORY_COLORS[e.category],
                }}>{e.category}</span>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{e.date}</span>
                {e.note && <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>· {e.note}</span>}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.15rem", color: "#a78bfa" }}>
              ${e.amount.toFixed(2)}
            </span>
            <button onClick={() => handleDelete(e.id)} style={{
              background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5", padding: "8px 14px", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s",
            }}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}