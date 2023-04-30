import { Timestamp } from "firebase/firestore";

//- actor types
export type Account = {
  username: string;
  password: string;
  lastLogin: Timestamp;
};

export type Role = "Player" | "Client" | "Admin";

//- product types
// export type PurchaseInfo = {
//   purchaseOnDate: Timestamp;
//   licenseEmail: string;
//   expiredDate?: Timestamp; // -> incase if we used month subscriptions
//   actionStamp?: CurdDate;
// };

export type PlayerTransaction = {
  topUpTotal: number;
  recentTopUp: number;
  recentTopUpDate: Timestamp;
  wallet: number;
};

export type CurdDate = {
  created: Timestamp;
  updated?: Timestamp;
  deleted?: Timestamp;
};
