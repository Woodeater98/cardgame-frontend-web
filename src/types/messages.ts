import type { Account } from "./account";
export interface Message {
  id: number;
  text: string;
  account: Account | null;
}
