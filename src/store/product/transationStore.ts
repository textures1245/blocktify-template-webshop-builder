import { defineStore } from "pinia";
import { useConfigComponentStore } from "../../configs/configCPNStore";
import { usePlayerStore } from "../actor/playerStore";
import axios, { AxiosResponse } from "axios";

export type TopUpTransaction = {
  topup_id: string;
  method: string;
  amount: number;
  created: Date;
};

type TopUpTransactionRespond = {
  topup_id: string;
  reference: string;
  player_name: string;
  method: string;
  transfer_to: string;
  amount: string;
  status: string;
  ip_address: string;
  agent: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const useTransactionStore = defineStore("useTransactionStore", {
  state: () => ({
    topUpTransactionList: <TopUpTransaction[]>[
      // {
      //   topup_id: "1",
      //   method: "TrueMoneyWallet",
      //   amount: 900,
      //   created: new Date(1684436006000),
      // },
      // {
      //   topup_id: "1",
      //   method: "Tsd",
      //   amount: 900,
      //   created: new Date(1684436006000),
      // },
      // {
      //   topup_id: "1",
      //   method: "TrueMoneyWallet",
      //   amount: 900,
      //   created: new Date(1684436006000),
      // },
      // {
      //   topup_id: "1",
      //   method: "TrueMoneyWallet",
      //   amount: 900,
      //   created: new Date(1684436006000),
      // },
      // {
      //   topup_id: "1",
      //   method: "TrueMoneyWallet",
      //   amount: 900,
      //   created: new Date(1684436006000),
      // },
    ],
  }),
  getters: {
    getTopUpTransactionList: (state) => state.topUpTransactionList,
    getDataConfig: (state) => {
      var config = {
        method: "",
        maxBodyLength: Infinity,
        url: "",
        headers: {
          "x-store-id": useConfigComponentStore().getWebsiteConfig.storeID,
        },
        data: {},
      };
      return config;
    },
  },
  actions: {
    async onFetchTopUpTransactionList(
      playerName: string
    ): Promise<TopUpTransaction[]> {
      const config = this.getDataConfig;
      config.url =
        import.meta.env.VITE_GET_TRANSACTION_LIST_BY_USERNAME + playerName;
      return axios(config)
        .then((res: AxiosResponse<TopUpTransactionRespond[]>) => {
          return (this.topUpTransactionList = res.data.map((t) => {
            return {
              topup_id: t.topup_id,
              method: t.method,
              amount: +t.amount,
              created: new Date(+t.created_at * 1000),
            };
          }));
        })
        .catch(function (error) {
          console.error(error);
          return [];
        });
    },
  },
});
