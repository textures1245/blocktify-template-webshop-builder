<script lang="ts">
import AdminDrawerLayout from "./layouts/ClientDrawerLayout.vue";
import AppBarLayout from "./layouts/AppBarLayout.vue";
import BannerLayout from "./layouts/BannerLayout.vue";
import SidebarLayout from "./layouts/SidebarLayout.vue";
import HeaderBarLayout from "./layouts/HeaderBarLayout.vue";
import { ref } from "vue";
import { useConfigComponentStore } from "./configs/configCPNStore";
import ApiKeyGenerator from "./auth/ApiKeyGenerator.vue";
import FooterLayout from "./layouts/FooterLayout.vue";

import ClientLogin from "./auth/ClientLogin.vue";
export default {
  components: {
    AppBarLayout,
    AdminDrawerLayout,
    BannerLayout,
    HeaderBarLayout,
    SidebarLayout,
    FooterLayout,
    ClientLogin,
    ApiKeyGenerator,
  },
  setup() {
    return {
      globalCSSConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
};
</script>
<template>
  <ClientLogin v-if="$route.name === 'clientManagementLogin'"></ClientLogin>
  <ApiKeyGenerator
    v-if="$route.name === 'apiStaffKeyGenerator'"
  ></ApiKeyGenerator>
  <div
    v-else
    :style="`font-family: '${globalCSSConfig.fontFamily}', sans-serif;`"
    :class="`!text-${globalCSSConfig.fontSize} `"
  >
    <v-app :data-theme="globalCSSConfig.themeColor" class="!scroll-smooth">
      <v-layout>
        <AppBarLayout></AppBarLayout>
        <v-main>
          <AdminDrawerLayout></AdminDrawerLayout>
          <BannerLayout></BannerLayout>
          <div
            :class="[
              '!h-auto w-full thai-font eng-font pt-5 pb-15',
              globalCSSConfig.bgColor,
            ]"
          >
            <v-container>
              <div class="grid-parent gap-6">
                <div class="col-span-full">
                  <HeaderBarLayout></HeaderBarLayout>
                </div>
                <div
                  class="col-span-full md:col-span-5 row-span-4 card bg-gray-100 glass"
                >
                  <v-container>
                    <router-view></router-view>
                  </v-container>
                </div>
                <SidebarLayout></SidebarLayout>
              </div>
            </v-container>
          </div>
        </v-main>
      </v-layout>
      <FooterLayout
        :background="globalCSSConfig.bgColor.slice(3)"
      ></FooterLayout>
    </v-app>
  </div>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Anuphan&family=Chakra+Petch&family=Itim&family=Kanit:wght@200&family=Mitr&family=Noto+Sans+Thai&family=Pattaya&family=Prompt&family=Taviraj&display=swap");
</style>
