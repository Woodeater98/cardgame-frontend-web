// src/services/accountService.ts
import axios from "axios";

const API_BASE = "http://localhost:3000";

export const createAccount = async (displayName: string) => {
  const res = await axios.post(`${API_BASE}/accounts`, { displayName });
  return res.data;
};

export const getAccount = async (id?: number | null) => {
  const res = await axios.get(`${API_BASE}/accounts${id}`);
  return res.data;
};
