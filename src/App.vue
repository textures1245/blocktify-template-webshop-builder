<script lang="ts">
import { useConfigComponentStore } from "./configs/configCPNStore";
import { useProductStore } from "./store/product/productStore";
import onLoading from "./components/onLoading.vue";
import { useTransactionStore } from "./store/product/transationStore";
import { usePlayerStore } from "./store/actor/playerStore";
export default {
  components: { onLoading },
  setup() {
    return {
      globalCSSConfig: useConfigComponentStore().getGlobalConfig,
      productStore: useProductStore(),
    };
  },

  data() {
    return {
      isLoading: true,
    };
  },

  async mounted() {
    useProductStore().onInitializeUniqueProductType();
    // await usePlayerStore().setPlayer({
    //   avatar: "https://minotar.net/helm/mhf_steve/600.png",
    //   playerName: "codename_t",
    //   role: "Player",
    //   transaction: {
    //     wallet: 3600,
    //     topUpTotal: null,
    //     recentTopUp: null,
    //     recentTopUpDate: null,
    //   },
    //   fromStoreId: "test",
    //   username: "",
    //   password: "",
    // });
    await this.productStore.fetchProducts().then(() => {
      this.isLoading = false;
    });
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
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Anuphan&family=Chakra+Petch&family=Itim&family=Kanit:wght@200&family=Mitr&family=Noto+Sans+Thai&family=Pattaya&family=Prompt&family=Taviraj&display=swap");
</style>
