import { defineStore } from "pinia";
import { Account, Role } from "../../store/types";
import {
  Timestamp,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { useCollection, useDocument } from "vuefire";
import router from "../../routers/routerApp";
import { ref } from "vue";
import { WebsiteConfig } from "../../configs/configCSS";
import { useConfigComponentStore } from "../../configs/configCPNStore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    isClientAuth: ref(false),
  }),
  getters: {
    getIsClientAuth: (state) => state.isClientAuth,
  },
  actions: {
    async onClientSignIn(storeID: string) {
      return useDocument<WebsiteConfig>(
        doc(collection(db, "ClientWebshops"), storeID)
      )
        .promise.value.then((store) => {
          console.log(store);
          if (store) {
            let data = <WebsiteConfig>{
              firebaseUID: store.id,
              storeID: store.storeID,
              hostName: store.hostName,
              domainExpiredDate: new Date(
                +(store.domainExpiredDate as any as number) * 1000
              ),
              phone: null,
            };
            useConfigComponentStore().setWebsiteConfig(data);
            this.isClientAuth = true;
            return true;
          }
          return false;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

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
