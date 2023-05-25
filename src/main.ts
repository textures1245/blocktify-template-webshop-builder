import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

//* formkit configuration
import { defaultConfig, plugin } from "@formkit/vue";
import "@formkit/themes/genesis";

//* Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//* Pinia
import { createPinia } from "pinia";

//* necessary lib stuff
import { draggable } from "vuedraggable";
import LoadScript from "vue-plugin-load-script";
import { MotionPlugin } from "@vueuse/motion";
import { createAutoAnimatePlugin } from "@formkit/addons";

import router from "./routers/routerApp";

import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from "vuefire";
import { firebaseApp } from "./firebase/firebase.config";

const app = createApp(App);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
    VueFireFirestoreOptionsAPI(),
  ],
});
app.component("draggable", draggable);

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(
  plugin,
  defaultConfig({
    theme: "genesis",
    plugins: [createAutoAnimatePlugin()],
  })
);
app.use(vuetify);
app.use(LoadScript);
app.use(MotionPlugin);

//- Base initialized
app.mount("#app");
