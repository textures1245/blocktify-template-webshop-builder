<script lang="ts">
import { useRouterStore } from "../routers/routerStore";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { usePlayerStore } from "../store/actor/playerStore";
import { AppBar } from "../configs/configCSS";
import PlayerDetailDialog from "../widgets/PlayerDetailDialog.vue";
import { useClientStore } from "../auth/store/authClientStore";

export default {
  components: { PlayerDetailDialog },
  setup() {
    const cssConfig = useConfigComponentStore();
    const appBarConfig = cssConfig.getAppBarConfig;
    return {
      viewRoutes: useRouterStore().getViewRoutes,
      globalConfig: useConfigComponentStore().getGlobalConfig,
      onPlayerView: usePlayerStore().getCurrentPlayer,
      appBarConfig,
      onClientView: useClientStore().getIsClientAuth,
    };
  },
  mounted() {
    this.setConfig(this.appBarConfig);
  },

  computed: {
    navigateBtnStyle() {
      return this.appBarConfig.bgImg.isHave === "true" ? "btn-primary" : "";
    },
  },
  data() {
    return {
      appBarTempConfig: <AppBar>{
        brandImg: "",
        avatar: "",
      },
      menuToggler: false,
    };
  },

  methods: {
    setConfig(newConfig: AppBar) {
      this.appBarTempConfig = newConfig;
    },

    redirect(url: string) {
      this.$router.push(`${url}`);
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
        appBarConfig.glass ? 'glass' : null,
      ]"
    >
      <template v-slot:prepend>
        <div
          class="hidden w-screen -ml-3.5 md:grid !bg-opacity-70 grid-cols-5 place-items-center"
        >
          <!--- redirect on topup page when player isn't authenticated -->
          <router-link
            v-for="(view, index) in viewRoutes"
            :to="
              view.name !== 'topup'
                ? view.path
                : onPlayerView !== null
                ? '/app/topup'
                : '/login'
            "
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
              :class="[' rounded-md', navigateBtnStyle]"
            >
              <div class="flex gap-2 items-center">
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
          <router-link
            v-if="!onPlayerView"
            :to="{ name: 'PlayerLogin' }"
            :exact-active="'glass'"
          >
            <v-card-text
              :to="{ name: 'PlayerLogin' }"
              :active-class="'glass rounded-md'"
              color="transparent"
              variant="text"
              border="0"
              :class="[
                'hover:cursor-pointer hover:drop-shadow-xl',
                'rounded-md',
                navigateBtnStyle,
              ]"
            >
              <div class="flex gap-2 items-center">
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
          <PlayerDetailDialog v-else>
            <template #activator>
              <v-card-text
                color="transparent"
                variant="text"
                border="0"
                :class="[
                  'hover:cursor-pointer hover:drop-shadow-xl',
                  'rounded-md',
                  navigateBtnStyle,
                ]"
              >
                <div class="flex gap-2 items-center">
                  <v-icon
                    class="!text-primary-content"
                    icon="mdi-account-badge"
                  ></v-icon>
                  <span class="!text-primary-content flex mx-auto">
                    ลายละเอียดบัญชี
                  </span>
                </div>
              </v-card-text>
            </template>
          </PlayerDetailDialog>
        </div>
      </template>
      <div id="navigation-dropper-mobile-size" class="block md:hidden">
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
      </div>
      <v-spacer></v-spacer>
      <template v-slot:append>
        <div
          :class="[
            'menu block md:hidden  z-50  rounded-md',
            menuToggler ? 'active' : '',
          ]"
        >
          <button
            @click="() => (menuToggler = !menuToggler)"
            class="nav-tgl !btn-primary"
            type="button"
            aria-label="toggle menu"
          >
            <!-- this span just for the three dividers in the hamburger button--><span
              aria-hidden="true"
            ></span>
          </button>
          <nav class="nav before:bg-secondary z-50">
            <!-- I don't care about the menu elements here so I will hide them-->
            <div
              v-show="menuToggler"
              :class="[
                'transition-opacity flex gap-3 w-80 mr-2',
                menuToggler ? 'opacity-100' : 'opacity-0',
              ]"
            >
              <router-link
                v-for="(view, index) in viewRoutes"
                :to="
                  view.name !== 'topup'
                    ? view.path
                    : onPlayerView
                    ? '/app/topup'
                    : '/login'
                "
                :active-class="'glass rounded-md'"
                :class="['hover:cursor-pointer hover:drop-shadow-xl']"
              >
                <v-card-text
                  color="transparent"
                  variant="text"
                  :to="view.path"
                  :exact-active="'glass'"
                  :class="[' rounded-md', navigateBtnStyle]"
                >
                  <div class="flex gap-2 items-center">
                    <v-icon
                      class="!text-primary-content"
                      :icon="view.icon"
                    ></v-icon>
                  </div>
                </v-card-text>
              </router-link>
              <router-link
                v-if="!onPlayerView"
                :to="{ name: 'PlayerLogin' }"
                :active-class="'glass rounded-md'"
              >
                <v-card-text
                  :to="{ name: 'PlayerLogin' }"
                  :active-class="'glass rounded-md'"
                  variant="text"
                  border="0"
                  :class="[
                    'hover:cursor-pointer hover:drop-shadow-xl',
                    ' rounded-md',
                    navigateBtnStyle,
                  ]"
                >
                  <div class="flex items-center">
                    <v-icon
                      class="!text-primary-content"
                      icon="mdi-account"
                    ></v-icon>
                  </div>
                </v-card-text>
              </router-link>
              <PlayerDetailDialog v-else>
                <template #activator>
                  <v-card-text
                    color="transparent"
                    variant="text"
                    border="0"
                    :class="[
                      'hover:cursor-pointer hover:drop-shadow-xl',
                      '  rounded-md',
                      navigateBtnStyle,
                    ]"
                  >
                    <div class="flex items-center">
                      <v-icon
                        class="!text-primary-content"
                        icon="mdi-account-badge"
                      ></v-icon>
                    </div>
                  </v-card-text>
                </template>
              </PlayerDetailDialog>
            </div>
          </nav>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
<style scoped lang="scss">
.nav {
  ul {
    display: flex;
    z-index: 20000 !important;
  }
}

.nav-tgl {
  display: inline-block;
  cursor: pointer;
  position: fixed;
  z-index: 100;
  right: 10px;
  top: 5px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  padding: 0;
  background: #fff;
  box-shadow: 0px 4px 24px rgba(#000, 0.24);
  line-height: 0.6;
  text-align: center;

  // making the dividers
  > span {
    // the second divider
    display: inline-block;
    position: relative;
    height: 2px;
    width: 34px;
    border-radius: 1px;
    background: #293335;
    vertical-align: middle;

    // the first & the third dividers
    &:before,
    &:after {
      display: inline-block;
      position: absolute;
      content: "";
      height: 2px;
      border-radius: 1px;
      background: #293335;
      // for the hover state
      transition: all 200ms;
    }
    &:before {
      top: -11px;
      left: 3px;
      width: 28px;
    }
    &:after {
      top: 11px;
      left: 6px;
      width: 22px;
    }
  }

  // ofcorse we should find a replacement for the focus state but it's not our topic
  &:focus {
    outline: none;
  }

  &:hover > span:after,
  &:hover > span:before {
    width: 34px;
    left: 0;
  }
}

// for the nav background (styling the nav itself is not our topic)
.nav:before {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  width: 100vw;
  height: 100vh;
  transition: all 500ms ease-in-out;

  // that's all the pen about
  clip-path: circle(30px at calc(100% - 65px) 65px);
  // for AT
  visibility: hidden;
}

// when it gits activated
.menu.active {
  .nav:before {
    visibility: visible;

    // that's all the pen about
    clip-path: circle(100%);
  }

  .nav-tgl > span {
    height: 0;
    &:after,
    &:before {
      top: 0px;
      left: 0;
      width: 34px;
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:before {
      transform: rotate(45deg);
    }
  }
}
</style>

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
