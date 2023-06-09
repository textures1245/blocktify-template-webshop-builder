<script lang="ts">
import FooterLayout from "../layouts/FooterLayout.vue";
import AppBarLayout from "../layouts/AppBarLayout.vue";
import ClientDrawerLayout from "../layouts/ClientDrawerLayout.vue";
import BannerLayout from "../layouts/BannerLayout.vue";
import HeaderBarLayout from "../layouts/HeaderBarLayout.vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { useClientStore } from "../auth/store/authClientStore";
import CurveCanvas from "../components/CurveCanvas.vue";

export default {
  components: {
    FooterLayout,
    AppBarLayout,
    ClientDrawerLayout,
    BannerLayout,
    SidebarLayout,
    HeaderBarLayout,
    CurveCanvas,
  },
  setup() {
    const store = useConfigComponentStore();
    return {
      globalCSSConfig: store.getGlobalConfig,
      footerConfig: store.getFooterConfig,
      onClientView: useClientStore().getIsClientAuth,
    };
  },
};
</script>
<template>
  <section
    :data-theme="globalCSSConfig.themeColor"
    :style="`font-family: '${globalCSSConfig.fontFamily}', sans-serif;`"
  >
    <ClientDrawerLayout v-if="onClientView"></ClientDrawerLayout>
    <AppBarLayout></AppBarLayout>
    <v-layout>
      <v-main>
        <div>
          <BannerLayout></BannerLayout>

          <v-card
            :class="[
              '!h-auto w-full thai-font eng-font pt-5 pb-[15rem]',
              globalCSSConfig.bgColor,
            ]"
          >
            <CurveCanvas position="top"></CurveCanvas>
            <v-container>
              <div class="grid-parent gap-6">
                <div class="col-span-full">
                  <HeaderBarLayout></HeaderBarLayout>
                </div>
                <v-card
                  elevation="6"
                  class="col-span-full w-full md:col-span-5 row-span-4 text-base-content card bg-base-100"
                >
                  <v-container>
                    <router-view></router-view>
                  </v-container>
                </v-card>
                <SidebarLayout></SidebarLayout>
              </div>
            </v-container>
          </v-card>
        </div>
      </v-main>
      <CurveCanvas
        v-if="!footerConfig.bg.isImage"
        position="bottom"
      ></CurveCanvas>
    </v-layout>
    <FooterLayout></FooterLayout>
  </section>
</template>
<style lang="scss"></style>
