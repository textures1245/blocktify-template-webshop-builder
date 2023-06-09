import { defineStore } from "pinia";
import FormData from "form-data";
import axios, { AxiosError, AxiosResponse } from "axios";
import { doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { HmacSHA256 } from "crypto-js";
import { ref } from "vue";
import { WebsiteConfig } from "../../configs/configCSS";
import { useConfigComponentStore } from "../../configs/configCPNStore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    isClientAuth: ref(false),
  }),
  getters: {
    getIsClientAuth: (state) => state.isClientAuth,
    getDataConfig: (state) => {
      var data = new FormData();

      var config = {
        method: "",
        maxBodyLength: Infinity,
        url: "",
        headers: {
          ...data.getHeaders,
        },
        data: data,
      };
      return { data, config };
    },
  },
  actions: {
    async onAddClientSetup(
      storeID: string
    ): Promise<{ status: boolean; message: string; data?: WebsiteConfig }> {
      let { data, config } = this.getDataConfig;

      //- set next month unix timestamp
      const hostname = window.location.hostname;
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

      config.method = "post";
      config.url = import.meta.env.VITE_CLIENT_GEN_KEY_API;
      data.append("storeID", storeID);
      data.append("expireDate", unixTimestamp);
      return axios
        .request(config)
        .then(
          async (
            response: AxiosResponse<{
              status: boolean;
              message: string;
            }>
          ) => {
            //- for checked if key was exists
            if (response.data.status) {
              await setDoc(doc(db, "ClientWebshops", hostname), {
                configuration: null,
                storeID: storeID,
                hostName: hostname,
                domainExpiredDate: unixTimestamp,
                phone: null,
              });
              return {
                status: true,
                message: response.data.message,
              };
            } else {
              return {
                status: false,
                message: response.data.message,
              };
            }
          }
        )
        .catch((error: AxiosError) => {
          console.error(error);
          switch (error.code) {
            case "400":
              return {
                status: false,
                message:
                  "Indicates that one or more of the required parameters are empty or invalid.",
              };
            default:
              return {
                status: false,
                message: "ตรวจไม่พบ Store ID ที่ถูกบันทึกไว้โปรดลองอีกครั้ง",
              };
          }
        });
    },
    async onClientSignIn(
      storeID: string
    ): Promise<{ status: boolean; message: string }> {
      const hostname = window.location.hostname;
      const documentRef = doc(collection(db, "ClientWebshops"), hostname);

      try {
        const secretKey = import.meta.env.VITE_HASH_STORE_ID_SECRET_KEY;
        // Create a HMAC instance with the secret key
        const hashedStoreId = HmacSHA256(storeID, secretKey).toString();
        console.log(hashedStoreId);
        const documentSnapshot = await getDoc(documentRef);
        const store = documentSnapshot.exists()
          ? (documentSnapshot.data() as WebsiteConfig)
          : null;

        if (store) {
          if (store.storeID !== hashedStoreId) {
            return {
              status: false,
              message: "ไม่พบ StoreID ที่ระบุโปรดกรุณากรอกใหม่",
            };
          }

          const data: WebsiteConfig = {
            storeID: store.storeID,
            hostName: store.hostName,
            domainExpiredDate: new Date(
              (store.domainExpiredDate as any as number) * 1000
            ),
            phone: store.phone,
          };
          useConfigComponentStore().setWebsiteConfig(data);
          this.isClientAuth = true;

          return {
            status: true,
            message: "คุณได้เข้าสู่ระบบในฐานะ Client แล้ว",
          };
        } else {
          const res = await this.onAddClientSetup(hashedStoreId);

          if (res.status) {
            const data: WebsiteConfig = {
              storeID: res.data!.storeID,
              hostName: res.data!.hostName,
              domainExpiredDate: new Date(
                (res.data!.domainExpiredDate as any as number) * 1000
              ),
              phone: null,
            };
            useConfigComponentStore().setWebsiteConfig(data);
            this.isClientAuth = true;

            return {
              status: true,
              message: "คุณได้ลงทะเบียนเว็บไซต์เรียบร้อยแล้ว",
            };
          }

          return res;
        }
      } catch (err) {
        console.error(err);
        return {
          status: false,
          message: "มีบางอย่างผิดปกติ โปรดติดต่อผู้ดูแลระบบ",
        };
      }
    },

    // async onClientSignIn(
    //   storeID: string
    // ): Promise<{ status: boolean; message: string }> {
    //   const hostname = window.location.hostname;
    //   return useDocument<WebsiteConfig>(
    //     doc(collection(db, "ClientWebshops"), hostname)
    //   )
    //     .promise.value.then(async (store) => {
    //       //- if store found then set the website config otherwise
    //       //- create a new one since it may be the first register or invalid data
    //       if (store) {
    //         if (store.storeID !== storeID)
    //           return {
    //             status: false,
    //             message: "ไม่พบ StoreID ที่ระบุโปรดกรุณากรอกใหม่",
    //           };
    //         let data = <WebsiteConfig>{
    //           storeID: store.storeID,
    //           hostName: store.hostName,
    //           domainExpiredDate: new Date(
    //             +(store.domainExpiredDate as any as number) * 1000
    //           ),
    //           phone: null,
    //         };
    //         useConfigComponentStore().setWebsiteConfig(data);
    //         this.isClientAuth = true;
    //         return {
    //           status: true,
    //           message: "คุณได้เข้าสู่ระบบในฐานะ Client แล้ว",
    //         };
    //       } else {
    //         return this.onAddClientSetup(storeID).then((res) => {
    //           if (res.status) {
    //             let data = <WebsiteConfig>{
    //               storeID: res.data!.storeID,
    //               hostName: res.data!.hostName,
    //               domainExpiredDate: new Date(
    //                 +(res.data!.domainExpiredDate as any as number) * 1000
    //               ),
    //               phone: null,
    //             };
    //             useConfigComponentStore().setWebsiteConfig(data);
    //             this.isClientAuth = true;
    //             return {
    //               status: true,
    //               message: "คุณได้ลงทะเบียนเว็บไซต์เรัยบร้อยแล้ว",
    //             };
    //           }
    //           return res;
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       return {
    //         status: false,
    //         message: "มีบางอย่างผิดปกติ โปดรติดต่อผู้ดูแลระบบ",
    //       };
    //     });
    // },

    //- unused
    // async onSignIn(email: string, password: string) {
    //   return signInWithEmailAndPassword(auth, email, password)
    //     .then(async (userCredential) => {
    //       if (!userCredential) {
    //         console.error("user credentials not found");
    //         return false;
    //       }
    //       const storeUid = userCredential.user.uid;
    //       const res = await useCollection<ClientStore>(
    //         collection(db, "Clients"),
    //         {
    //           wait: true,
    //         }
    //       ).promise.value.then((userDocs) => {
    //         let userData = userDocs.find((s) => s.uId === storeUid);
    //         if (userData) {
    //           this.clientStore = userData;
    //           router.push("/overview");
    //           return true;
    //         } else return false;
    //       });
    //       return res;
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       return false;
    //     });
    // },

    // async onSignOut() {
    //   return signOut(auth)
    //     .then(() => {
    //       this.clientStore = {} as ClientStore;
    //       return true;
    //     })
    //     .catch((error) => {
    //       throw new Error(error);
    //     });
    // },
  },
});
