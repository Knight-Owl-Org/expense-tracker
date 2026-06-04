import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AddExpensePage from "./pages/addExpense";
import History from "./pages/history";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh" }}>
        <nav style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: "20px", gap: "10px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", marginRight: "30px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>💸</span>
          <span style={{
          background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Expense Tracker</span>
         </span>
          {[
            { to: "/", label: "📊 Dashboard" },
            { to: "/add", label: "➕ Add Expense" },
            { to: "/history", label: "📋 History" },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} end style={({ isActive }) => ({
              padding: "10px 20px", borderRadius: "25px", textDecoration: "none",
              fontWeight: "600", fontSize: "0.95rem", transition: "all 0.3s",
              background: isActive ? "linear-gradient(135deg, #7c3aed, #3b82f6)" : "rgba(255,255,255,0.08)",
              color: "white", border: isActive ? "none" : "1px solid rgba(255,255,255,0.15)",
            })}>{label}</NavLink>
          ))}
        </nav>
        <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpensePage />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}