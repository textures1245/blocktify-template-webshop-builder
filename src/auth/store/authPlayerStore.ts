import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { useConfigComponentStore } from "../../configs/configCPNStore";
import { Player, usePlayerStore } from "../../store/actor/playerStore";

export type AuthPlayerResponse = {
  isValidPassword: boolean;
  data: {
    playerCredit: number;
  };
  status: 400 | 500 | "400" | "500" | undefined;
};

export const useAuthPlayerStore = defineStore("authPlayerStore", {
  state: () => ({}),
  getters: {
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
    async onPlayerAuthenticate(
      playerName: string,
      playerPassword: string
    ): Promise<{ status: number | null; msg: string }> {
      let { data, config } = this.getDataConfig;
      config.method = "post";
      config.url = import.meta.env.VITE_PLAYER_AUTHENTICATION_API;

      data.append("playerName", playerName);
      data.append("playerPassword", playerPassword);

      return axios(config)
        .then(async (res: AxiosResponse<AuthPlayerResponse>) => {
          const auth = res.data;
          console.log(auth);
          switch (auth.status) {
            case 400:
            case "400":
              return {
                status: 400,
                msg: "บัญชีนี้ไม่อยู่ในระบบ โปรดแน่ใจว่าท่านกรอกข้อมูลถูกต้อง",
              };
            case 500:
            case "500":
              return {
                status: 500,
                msg: "เซิฟเวอร์มีปัญหา ได้โปรดเข้าใช้ในภายหลัง ขออภับในความไม่สะดวกครับ",
              };
            default:
              const dataPlayer = <Player>{
                avatar: "https://minotar.net/helm/mhf_steve/600.png",
                playerName,
                role: "Player",
                transaction: {
                  wallet: auth.data.playerCredit,
                },
                fromStoreId: useConfigComponentStore().getWebsiteConfig.storeID,
              };
              await usePlayerStore().setPlayer(dataPlayer);
              return {
                status: null,
                msg: "คุณได้ทำการล็อกอินเป็นที่เรียบร้อยแล้ว",
              };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 408,
            msg: "มีบางอย่างขัดข้องทำให้ไม่สามารถประมวลผลได้ โปรดติดต่อเจ้าหน้าที่",
          };
        });
    },
  },
});
