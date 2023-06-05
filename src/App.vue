<script lang="ts">
//@ts-nocheck
import { useConfigComponentStore } from "./configs/configCPNStore";
import { useProductStore } from "./store/product/productStore";
import onLoading from "./components/onLoading.vue";
import Swal from "sweetalert2";

export default {
  components: { onLoading },
  name: "app",
  created() {
    document.title = this.globalCSSConfig.websiteName;
    const favicon = document.getElementById("favicon");
    if (favicon) favicon!.href = this.globalCSSConfig.iconLogoSrc;
  },
  setup() {
    const configStore = useConfigComponentStore();
    return {
      configStore,
      globalCSSConfig: configStore.getGlobalConfig,
      productStore: useProductStore(),
    };
  },

  data() {
    return {
      isLoading: true,
    };
  },

  async mounted() {
    this.configStore.onInitalConfiguration().then(async (res) => {
      if (res.status === "success") {
        await this.onInitializedData();
      } else {
        this.isLoading = false;
      }
      Swal.fire({
        icon: res.status,
        text: res.msg,
      });
    });
  },

  methods: {
    async onInitializedData() {
      await this.productStore.fetchProducts().then(() => {
        useProductStore().onInitializeUniqueProductType();
        this.isLoading = false;
      });
    },
  },
};
</script>
<template>
  <v-app :data-theme="globalCSSConfig.themeColor" class="!scroll-smooth">
    <onLoading v-if="isLoading"></onLoading>
    <div
      v-else
      :style="`font-family: '${globalCSSConfig.fontFamily}', sans-serif;`"
      :class="`!text-${globalCSSConfig.fontSize} `"
    >
      <router-view> </router-view>
    </div>
  </v-app>
</template>
<style lang="scss"></style>
