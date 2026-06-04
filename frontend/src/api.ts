import axios from "axios";
import { Expense, AddExpensePayload, Category } from "./types";

const BASE = "http://localhost:3001/api";

export const getExpenses = (category?: Category) =>
  axios.get<Expense[]>(`${BASE}/expenses`, { params: { category } }).then(r => r.data);

export const addExpense = (payload: AddExpensePayload) =>
  axios.post<Expense>(`${BASE}/expenses`, payload).then(r => r.data);

export const deleteExpense = (id: string) =>
  axios.delete<Expense>(`${BASE}/expenses/${id}`).then(r => r.data);

export const getTotal = (category?: Category) =>
  axios.get<{ total: number }>(`${BASE}/expenses/total`, { params: { category } }).then(r => r.data.total);

export const getSummary = () =>
  axios.get<Record<Category, number>>(`${BASE}/expenses/summary`).then(r => r.data);