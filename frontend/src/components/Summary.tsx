import { Category } from "../types";

interface Props { total: number; summary: Record<Category, number>; }

export default function Summary({ total, summary }: Props) {
  const max = Math.max(...Object.values(summary));

  return (
    <div className="card">
      <h2>Total Spent: ${total.toFixed(2)}</h2>
      <h3>By Category</h3>
      {(Object.entries(summary) as [Category, number][]).map(([cat, amount]) => (
        <div key={cat} className="summary-row">
          <span className="summary-cat">{cat}</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: `${max > 0 ? (amount / max) * 100 : 0}%` }} />
          </div>
          <span className="summary-amount">${amount.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}