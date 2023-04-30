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
        <router-link :to="``">
          <div class="!flex w-12 !justify-center !items-center">
            <img
              :src="appBarTempConfig.brandImg"
              alt="logo"
              :class="appBarConfig.avatar"
            />
          </div>
        </router-link>
      </template>

      <!-- <template v-slot:prepend>
        <router-link :to="``">
          <v-app-bar-nav-icon
            color="white"
            class="!bg-primary text-lg"
          ></v-app-bar-nav-icon>
        </router-link>
      </template> -->

      <!-- <v-app-bar-title>
        <div class="flex flex-col">
          <h3>
            {{ app.title }}
          </h3>
          <p class="text-caption">{{ app.subtitle }}</p>
        </div>
      </v-app-bar-title> -->

      <v-btn
        :variant="globalConfig.btnStyle.variant"
        :to="view.path"
        :class="[
          globalConfig.btnStyle.extraClass,
          '!btn-primary',
          'hover:cursor-pointer',
          'mr-2',
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
      <!-- <template v-slot:append>
        <v-menu transition="slide-x-reverse-transition">
          <template v-slot:activator="{ props }">
            <div>
              <v-divider></v-divider>
              <v-btn
                v-bind="props"
                size="small"
                :icon="app.accountIcon"
                class="!text-secondary !bg-primary-content"
              ></v-btn>
            </div>
          </template>
          <v-list class="mt-2">
            <v-list-item
              v-if="!isAuth"
              v-for="(userPath, i) in userPaths"
              :key="i"
            >
              <router-link :to="userPath.path">
                <v-list-item-title>{{ userPath.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
            <v-list-item v-else>
              <v-list-item-title
                class="cursor-pointer"
                @click="() => onSignOut()"
                >ออกจากระบบ</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template> -->
    </v-app-bar>
  </div>
</template>
<style lang="sass"></style>
