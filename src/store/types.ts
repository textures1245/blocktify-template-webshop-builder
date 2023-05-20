import { Timestamp } from "firebase/firestore";

//- actor types
export type Account = {
  username: string;
  password: string;
};

export type Role = "Player" | "Client";

//- product types
// export type PurchaseInfo = {
//   purchaseOnDate: Timestamp;
//   licenseEmail: string;
//   expiredDate?: Timestamp; // -> incase if we used month subscriptions
//   actionStamp?: CurdDate;
// };

export type PlayerTransaction = {
  wallet: number;
  topUpTotal?: number;
  recentTopUp?: number;
  recentTopUpDate?: Date;
};

export type CurdDate = {
  created: Date;
  updated: Date | null;
  deleted: Date | null;
};
