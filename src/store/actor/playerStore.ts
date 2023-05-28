import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { Account, PlayerTransaction, Role } from "../types";
import axios from "axios";
import FormData from "form-data";
import { useConfigComponentStore } from "../../configs/configCPNStore";
import { useTransactionStore } from "../product/transationStore";

export type Player = Account & {
  avatar: string;
  playerName: string;
  role: Role;
  transaction: PlayerTransaction;
  fromStoreId: string;
};

export type TopUpRanK = {
  player_name: string;
  amount: string;
  created_at?: string;
};

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    player: <Player | null>null,
  }),
  getters: {
    getCurrentPlayer: (state) => state.player,
    getDataConfig: (state) => {
      var data = new FormData();

      var config = {
        method: "",
        maxBodyLength: Infinity,
        url: "",
        headers: {
          ...data.getHeaders,
          "x-store-id": useConfigComponentStore().getWebsiteConfig.storeID,
        },
        data: data,
      };
      return { data, config };
    },
  },
  actions: {
    setPlayerWallet(wallet: number) {
      if (this.player) {
        this.player.transaction.wallet = wallet;
      }
      console.error("player not found");
    },

    async setPlayer(player: Player) {
      const playerTransactions =
        await useTransactionStore().onFetchTopUpTransactionList(
          player.playerName
        );
      if (playerTransactions) {
        let recentTransaction: PlayerTransaction = {
          wallet: player.transaction.wallet,
          topUpTotal: playerTransactions.reduce(
            (acc, { amount }) => acc + amount,
            0
          ),
          recentTopUp: Math.max(...playerTransactions.map((t) => t.amount)),
          recentTopUpDate: new Date(
            Math.max(...playerTransactions.map((t) => t.created.getTime()))
          ),
        };
        this.player = { ...player, transaction: recentTransaction };
      }
    },

    async fetchTopUpPlayersRanking(
      action: "RECENT" | "TOP_DONATE",
      limit: number
    ): Promise<TopUpRanK[]> {
      const { config } = this.getDataConfig;
      config.method = "get";
      config.url =
        action === "TOP_DONATE"
          ? import.meta.env.VITE_GET_TOPUP_RANKING
          : import.meta.env.VITE_GET_LASTEST_TOPUP;

      if (limit > 0) config.url = `${config.url}?limit=${limit}`;

      return axios(config)
        .then((res: { data: TopUpRanK[] }) => {
          // console.log(res)
          if (action === "TOP_DONATE")
            return res.data.map((player) => {
              return {
                player_name: player.player_name,
                amount: player.amount,
              };
            });
          return [...res.data];
        })
        .catch(function (error) {
          console.error(error);
          return [] as TopUpRanK[];
        });
    },
  },
});
