<script lang="ts">
import { useRouterStore } from "../routers/routerStore";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { AppBar } from "../configs/configCSS";
export default {
  setup() {
    const cssConfig = useConfigComponentStore();
    const appBarConfig = cssConfig.getAppBarConfig;
    return {
      viewRoutes: useRouterStore().getViewRoutes,
      globalConfig: useConfigComponentStore().getGlobalConfig,
      appBarConfig,
    };
  },
  mounted() {
    this.setConfig(this.appBarConfig);
  },
  data() {
    return {
      appBarTempConfig: <AppBar>{
        brandImg: "",
        avatar: "",
        background: {
          selected: "none",
          value: "",
        },
        boxShadow: "",
        position: "",
      },
    };
  },

  methods: {
    setConfig(newConfig: AppBar) {
      this.appBarTempConfig = newConfig;
    },
  },
};
</script>
<template>
  <div>
    <v-app-bar
      elevation="0"
      :image="
        appBarConfig.bgImg.isHave === 'true'
          ? appBarConfig.bgImg.src
          : undefined
      "
      color="transparent"
      :class="[
        'from-primary !bg-gradient-to-b !fixed',
        appBarConfig.glass ? 'glass' : null,
      ]"
    >
      <template v-slot:[appBarConfig.position!]>
        <router-link :to="`/app/overview`">
          <div class="!flex w-12 m-2 !justify-center !items-center">
            <img
              :src="appBarTempConfig.brandImg"
              alt="logo"
              :class="appBarConfig.avatar"
            />
          </div>
        </router-link>
        <v-btn
          :variant="globalConfig.btnStyle.variant"
          :to="view.path"
          :class="[
            globalConfig.btnStyle.extraClass,
            '!btn-primary',
            'hover:cursor-pointer',
            'm-1',
          ]"
          v-for="view in viewRoutes"
        >
          <div class="flex items-center">
            <v-icon class="!text-primary-content" :icon="view.icon"></v-icon>
            <span class="!text-primary-content flex mx-auto">
              {{ view.title }}
            </span>
          </div>
        </v-btn>
      </template>
      <router-link :to="{ name: 'PlayerLogin'}">
        <v-btn
          :variant="globalConfig.btnStyle.variant"
          :class="[
            globalConfig.btnStyle.extraClass,
            '!btn-primary',
            'hover:cursor-pointer',
            'mr-2',
          ]"
        >
          <div class="flex items-center">
            <v-icon class="!text-primary-content" icon="mdi-account"></v-icon>
            <span class="!text-primary-content flex mx-auto">
              เข้าสู่ระบบ
            </span>
          </div>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>
<style lang="sass"></style>
