<script lang="ts">
import { useConfigComponentStore } from "./configs/configCPNStore";
import { useProductStore } from "./store/product/productStore";
export default {
  components: {},
  setup() {
    return {
      globalCSSConfig: useConfigComponentStore().getGlobalConfig,
      productStore: useProductStore(),
    };
  },

  data() {
    return {
      isLoaded: false,
    };
  },

  async mounted() {
    useProductStore().onInitializeUniqueProductType();
    await this.productStore.fetchProducts().then(() => {
      this.isLoaded = true;
    });
  },
};
</script>
<template>
  <v-app
    v-if="isLoaded"
    :data-theme="globalCSSConfig.themeColor"
    class="!scroll-smooth"
  >
    <div
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
