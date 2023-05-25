import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { Account, PlayerTransaction, Role } from "../types";
import axios from "axios";
import FormData from "form-data";
import { useConfigComponentStore } from "../../configs/configCPNStore";

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
    player: <Player>{
      avatar: "https://minotar.net/helm/mhf_steve/600.png",
      playerName: "codename_t",
      role: "Player",
      transaction: {
        wallet: 3600,
      },
      fromStoreId: "test",
    },
  }),
  getters: {
    getCurrentPlayer: (state) => state.player,
    // getPlayers: (state) => state.players,
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
    setPlayer(player: Player) {
      this.player = player;
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
