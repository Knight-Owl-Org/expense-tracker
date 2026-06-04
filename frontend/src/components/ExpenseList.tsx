import { Expense } from "../types";
import { deleteExpense } from "../api";

interface Props { expenses: Expense[]; onDelete: () => void; }

export default function ExpenseList({ expenses, onDelete }: Props) {
  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    onDelete();
  };

  return (
    <div className="card">
      <h2>All Expenses ({expenses.length})</h2>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      <ul className="expense-list">
        {expenses.map(e => (
          <li key={e.id} className="expense-item">
            <div className="expense-info">
              <span className="expense-title">{e.title}</span>
              <span className="expense-category">{e.category}</span>
              <span className="expense-date">{e.date}</span>
              {e.note && <span className="expense-note">{e.note}</span>}
            </div>
            <div className="expense-right">
              <span className="expense-amount">${e.amount.toFixed(2)}</span>
              <button className="delete-btn" onClick={() => handleDelete(e.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}