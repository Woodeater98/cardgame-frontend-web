// src/services/messageService.ts
import axios from "axios";
import type { Message } from "../types/messages";

const API_BASE = "http://localhost:3000"; // Docker backend

export const getMessages = async (): Promise<Message[]> => {
  const res = await axios.get(`${API_BASE}/messages`);
  return res.data;
};

export const postMessage = async (text: string, accountId?: number) => {
  const res = await axios.post(`${API_BASE}/messages`, {
    text,
    accountId,
  });
  return res.data;
};

export const deleteMessage = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/messages/${id}`);
  return res;
};
