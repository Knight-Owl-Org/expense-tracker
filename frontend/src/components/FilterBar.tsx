import { Category } from "../types";

interface Props { selected: Category | ""; onChange: (c: Category | "") => void; }

export default function FilterBar({ selected, onChange }: Props) {
  return (
    <div className="filter-bar">
      <span>Filter by category:</span>
      <select value={selected} onChange={e => onChange(e.target.value as Category | "")}>
        <option value="">All</option>
        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}