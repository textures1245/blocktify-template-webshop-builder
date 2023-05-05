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
import {
  getCurrentUser,
  useCollection,
  useCurrentUser,
  useDocument,
} from "vuefire";
import router from "../../routers/routerApp";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export type ClientStore = {
  uId: string;
  storeID: string;
  expireDate: string;
  hostname: string;
};

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    clientStore: <ClientStore>{},
  }),
  getters: {},
  actions: {
    async onClientSignIn(storeID: string) {
      return useDocument<ClientStore>(
        doc(collection(db, "ClientWebshops"), storeID)
      )
        .promise.value.then((store) => {
          console.log(store);
          if (store) {
            this.clientStore = store;
            return true;
          }
          return false;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    async onSignIn(email: string, password: string) {
      return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          if (!userCredential) {
            console.error("user credentials not found");
            return false;
          }
          const storeUid = userCredential.user.uid;
          const res = await useCollection<ClientStore>(
            collection(db, "Clients"),
            {
              wait: true,
            }
          ).promise.value.then((userDocs) => {
            let userData = userDocs.find((s) => s.uId === storeUid);
            if (userData) {
              this.clientStore = userData;
              router.push("/overview");
              return true;
            } else return false;
          });
          return res;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },

    async onSignOut() {
      return signOut(auth)
        .then(() => {
          this.clientStore = {} as ClientStore;
          return true;
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
});
