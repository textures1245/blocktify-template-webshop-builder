import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { Account, PlayerTransaction, Role } from "../types";

export type Player = Account & {
  avatar: string;
  id: number;
  playerName: string;
  role: Role;
  regDate?: Timestamp;
  hasSession: boolean | number;
  email: string;
  phone: string | null;
  transaction: PlayerTransaction;
  fromStoreId: string;
};

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    player: <Player>{
      avatar: "https://minotar.net/helm/mhf_steve/600.png",
      id: 1,
      playerName: "Alex",
      role: "Player",
      hasSession: true,
      email: "email@minotar.net",
      fromStoreId: "1231",
      transaction: {
        topUpTotal: 1000,
        recentTopUp: 200,
        recentTopUpDate: new Timestamp(1647677385, 500000000),
        wallet: 6000,
      },
      phone: null,
      regDate: undefined,
    },

    players: <Player[]>[
      {
        avatar: "https://minotar.net/helm/mhf_steve/600.png",
        id: 1,
        playerName: "Alex",
        role: "Player",
        hasSession: true,
        email: "email@minotar.net",
        fromStoreId: "1231",
        transaction: {
          topUpTotal: 1000,
          recentTopUp: 200,
          recentTopUpDate: new Timestamp(1647677385, 500000000),
          wallet: 6000,
        },
        phone: null,
        regDate: undefined,
      },
      {
        avatar: "https://minotar.net/helm/mhf_steve/600.png",
        id: 1,
        playerName: "Alex",
        role: "Player",
        hasSession: true,
        email: "email@minotar.net",
        fromStoreId: "1231",
        transaction: {
          topUpTotal: 800,
          recentTopUp: 422,
          recentTopUpDate: new Timestamp(1647677000, 500000000),
          wallet: 6000,
        },
        phone: null,

        regDate: undefined,
      },
      {
        avatar: "https://minotar.net/helm/mhf_steve/600.png",
        id: 1,
        playerName: "Alex",
        role: "Player",
        hasSession: true,
        email: "email@minotar.net",
        fromStoreId: "1231",
        regDate: undefined,
        phone: null,
        transaction: {
          topUpTotal: 700,
          recentTopUp: 200,
          recentTopUpDate: new Timestamp(1647679012, 500000000),
          wallet: 6000,
        },
      },
    ],
  }),
  getters: {
    getCurrentPlayer: (state) => state.player,
    getPlayers: (state) => state.players,
  },
  actions: {},
});
