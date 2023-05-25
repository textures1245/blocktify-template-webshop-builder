<script lang="ts">
import { useRouterStore } from "../routers/routerStore";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { AppBar } from "../configs/configCSS";
export default {
  props: {
    offsetTop: {
      type: Number,
      required: true,
    },
  },
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

  computed: {
    navigateBtnStyle() {
      return this.appBarConfig.bgImg.isHave === "true" ? "btn-primary" : "";
    },

    fadeBg() {
      return this.offsetTop > 10 ? "!opacity-90" : "";
    },
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
      height="85"
      elevation="0"
      :image="
        appBarConfig.bgImg.isHave === 'true'
          ? appBarConfig.bgImg.src
          : undefined
      "
      color="transparent"
      scroll-threshold="300"
      :class="[
        'from-primary !bg-gradient-to-b   !fixed',
        fadeBg,
        appBarConfig.glass ? 'glass' : null,
      ]"
    >
      <template v-slot:prepend>
        <div class="w-screen grid !bg-opacity-70  grid-cols-5 place-items-center">
          <router-link
            v-for="(view, index) in viewRoutes"
            :to="view.path"
            :active-class="'glass rounded-md'"
            :class="[
              'hover:cursor-pointer hover:drop-shadow-xl',
              index === 2 ? 'order-3' : '',
            ]"
          >
            <v-card-text
              color="transparent"
              variant="text"
              :to="view.path"
              :exact-active="'glass'"
              :class="['m-1  p-2 rounded-md', navigateBtnStyle]"
            >
              <div class="flex items-center">
                <v-icon
                  class="!text-primary-content"
                  :icon="view.icon"
                ></v-icon>
                <span class="!text-primary-content flex mx-auto">
                  {{ view.title }}
                </span>
              </div>
            </v-card-text>
          </router-link>
          <router-link :to="`/app/overview`">
            <div class="!flex z-10 !justify-center !items-center">
              <v-avatar
                :image="appBarTempConfig.brandImg"
                alt="logo"
                size="75"
                :class="[appBarTempConfig.avatar]"
              >
              </v-avatar>
            </div>
          </router-link>
          <router-link :to="{ name: 'PlayerLogin' }" :exact-active="'glass'">
            <v-card-text
              :to="{ name: 'PlayerLogin' }"
              :active-class="'glass rounded-md'"
              color="transparent"
              variant="text"
              border="0"
              :class="[
                'hover:cursor-pointer hover:drop-shadow-xl',
                'm-1s  p-2 rounded-md',
                navigateBtnStyle,
              ]"
            >
              <div class="flex items-center">
                <v-icon
                  class="!text-primary-content"
                  icon="mdi-account"
                ></v-icon>
                <span class="!text-primary-content flex mx-auto">
                  เข้าสู่ระบบ
                </span>
              </div>
            </v-card-text>
          </router-link>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
<style scoped lang="scss"></style>

<!-- <script lang="ts">
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
      height="85"
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
  <style lang="sass"></style> -->
