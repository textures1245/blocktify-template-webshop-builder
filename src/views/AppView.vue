<script lang="ts">
import FooterLayout from "../layouts/FooterLayout.vue";
import AppBarLayout from "../layouts/AppBarLayout.vue";
import ClientDrawerLayout from "../layouts/ClientDrawerLayout.vue";
import BannerLayout from "../layouts/BannerLayout.vue";
import HeaderBarLayout from "../layouts/HeaderBarLayout.vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";

export default {
  components: {
    FooterLayout,
    AppBarLayout,
    ClientDrawerLayout,
    BannerLayout,
    SidebarLayout,
    HeaderBarLayout,
  },
  setup() {
    return {
      globalCSSConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
};
</script>
<template>
  <v-layout>
    <AppBarLayout></AppBarLayout>
    <v-main>
      <ClientDrawerLayout></ClientDrawerLayout>
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
  <FooterLayout :background="globalCSSConfig.bgColor.slice(3)"></FooterLayout>
</template>
<style lang="scss"></style>
