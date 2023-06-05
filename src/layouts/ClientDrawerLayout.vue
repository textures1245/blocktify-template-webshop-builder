<script lang="ts">
import { Ref, ref } from "vue";
import { useClientFeatureStore, Action } from "../store/clientFeatureStore";
import AppBarConfigUI from "../configs/ui/AppBarConfigUI.vue";
import FooterConfigUI from "../configs/ui/FooterConfigUI.vue";
import GlobalCSSConfigUI from "../configs/ui/GlobalCSSConfigUI.vue";
import HeaderBarConfigUI from "../configs/ui/HeaderBarConfigUI.vue";
import MainBodyConfigUI from "../configs/ui/MainBodyConfigUI.vue";
import BannerConfigUI from "../configs/ui/BannerConfigUI.vue";
import SideBarConfigUI from "../configs/ui/SidebarConfigUI.vue";
import ProductConfigUI from "../configs/ui-store/ProductConfigUI.vue";
import FilterConfigUI from "../configs/ui-store/FilterConfigUI.vue";
import HighlightConfigUI from "../configs/ui-store/HighlightConfigUI.vue";
import PlayerLoginConfigUI from "../configs/ui/PlayerLoginConfigUI.vue";
import ClientConfigUI from "../configs/ui/ClientConfigUI.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import Swal from "sweetalert2";

export default {
  components: {
    AppBarConfigUI,
    FooterConfigUI,
    GlobalCSSConfigUI,
    HeaderBarConfigUI,
    MainBodyConfigUI,
    BannerConfigUI,
    SideBarConfigUI,
    ProductConfigUI,
    FilterConfigUI,
    HighlightConfigUI,
    PlayerLoginConfigUI,
    ClientConfigUI,
  },
  setup() {
    return {
      actions: useClientFeatureStore().getClientFeatures,
      configStore: useConfigComponentStore(),
    };
  },

  mounted() {
    //- for extracting side menu options -> action[3] is store paths
    this.storeConfigOpts.storeOpts = this.actions[3].subActions!.reduce(
      (acc, obj) => ({ ...acc, [obj.action]: obj.title }),
      {}
    );
  },
  data() {
    return {
      toggleSideDrawer: <Ref<Action>>ref("NONE"),
      toggleLayoutOpts: "APPBAR_MODIFY",
      toggleStoreOpts: "PRODUCT_MODIFY",
      applySetting: {
        icon: "mdi-send-circle",
        title: "ยืนยันการตั้งค่า",
        value: "applySetting",
      },
      closeDrawerSetting: {
        icon: "mdi-close-circle",
        title: "ปิดหน้าส่วนการตั้งค่าชั่วคราว",
        value: "closeSetting",
      },
      isDrawerClose: false,
      layoutConfigOpts: {
        layoutOpts: {
          APPBAR_MODIFY: "เลทเอาท์ส่วนด้านบนสุด (App Bar)",
          BANNER_MODIFY: "เลทเอาท์แบนเนอร์ (Banner Section)",
          HEADER_MODIFY: "เลทเอาท์แถบด้านบนรองลงมา (Header Bar)",
          SIDEBAR_MODIFY: "เลทเอาท์ส่วนด้านข้าง (Side Bar)",
          MAIN_CONTENT_MODIFY: "เลทเอาท์หลักส่วนตรงกลาง (Main Content)",
          FOOTER_MODIFY: "เลทเอาท์ส่วนด้านล่างสุด (Footer Bar)",
        },
      },
      storeConfigOpts: {
        storeOpts: null as any,
      },
    };
  },
  methods: {
    onApplyConfiguration() {
      this.configStore.onSetNewConfiguration().then((res) => {
        Swal.fire({
          icon: res.status,
          text: res.msg,
        });
      });
    },
  },
};
</script>
<template>
  <v-tooltip text="เปิดหน้าต่างตัวตั้งค่า" v-if="isDrawerClose" location="top">
    <template v-slot:activator="{ props }">
      <v-btn
        class="!btn-primary btn-z-20000 fixed left-5 bottom-5"
        size="large"
        v-bind="props"
        v-if="isDrawerClose"
        icon="mdi-menu-open"
        @click="() => (isDrawerClose = false)"
      ></v-btn>
    </template>
  </v-tooltip>
  <v-navigation-drawer v-else elevation="4" :rail="true" permanent>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-tooltip v-for="a in actions" :text="a.title">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="a.icon || 'mdi-icon'"
            @click="() => (toggleSideDrawer = a.action)"
            :title="a.title"
            :value="a.action"
          ></v-list-item>
        </template>
      </v-tooltip>

      <!--- Apply Setting -->
    </v-list>
    <template v-slot:append>
      <div>
        <v-list density="compact" nav>
          <v-list-item
            class="!text-error"
            :prepend-icon="closeDrawerSetting.icon"
            @click="() => (isDrawerClose = true)"
            :title="closeDrawerSetting.title"
            :value="closeDrawerSetting.value"
          >
            <v-tooltip activator="parent" location="end">{{
              closeDrawerSetting.title
            }}</v-tooltip>
          </v-list-item>
          <v-list-item
            class="!text-success"
            :prepend-icon="applySetting.icon"
            @click="() => onApplyConfiguration()"
            :title="applySetting.title"
            :value="applySetting.value"
          >
            <v-tooltip activator="parent" location="end">{{
              applySetting.title
            }}</v-tooltip>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-if="!isDrawerClose"
    :temporary="toggleSideDrawer === 'NONE'"
    :permanent="toggleSideDrawer !== 'NONE'"
    location="left"
    rounded
    width="320"
  >
    <template v-slot:append>
      <hr class="border-gray-700" />
      <v-btn
        class="float-right"
        variant="text"
        icon="mdi-chevron-left"
        @click.stop="toggleSideDrawer = 'NONE'"
      ></v-btn>
    </template>
    <v-card variant="text" class="mx-auto text-sm" max-width="500">
      <GlobalCSSConfigUI
        v-if="toggleSideDrawer === 'GLOBAL_CSS_CONFIGURE'"
      ></GlobalCSSConfigUI>
      <div class="" v-if="toggleSideDrawer === 'LAYOUT_MODIFY'">
        <v-list>
          <v-list-subheader>
            <div class="flex gap-2 items-center m-4">
              <div class="">
                <p
                  class="text-xs badge badge-sm badge-accent text-accent-content"
                >
                  เลือกส่วนที่คูณต้องการปรับแต่ง
                </p>
                <FormKit
                  type="select"
                  v-model="toggleLayoutOpts"
                  label="Layout Options"
                  placeholder="Select a Font size."
                  name="fontSizes"
                  :options="layoutConfigOpts.layoutOpts"
                  validation="required"
                />
              </div>
            </div>
            <hr class="border-gray-200 w-full" />
          </v-list-subheader>
          <AppBarConfigUI
            v-if="toggleLayoutOpts === 'APPBAR_MODIFY'"
          ></AppBarConfigUI>
          <BannerConfigUI
            v-if="toggleLayoutOpts === 'BANNER_MODIFY'"
          ></BannerConfigUI>
          <HeaderBarConfigUI
            v-if="toggleLayoutOpts === 'HEADER_MODIFY'"
          ></HeaderBarConfigUI>
          <MainBodyConfigUI
            v-if="toggleLayoutOpts === 'MAIN_CONTENT_MODIFY'"
          ></MainBodyConfigUI>
          <FooterConfigUI
            v-if="toggleLayoutOpts === 'FOOTER_MODIFY'"
          ></FooterConfigUI>
          <SideBarConfigUI
            v-if="toggleLayoutOpts === 'SIDEBAR_MODIFY'"
          ></SideBarConfigUI>
        </v-list>
      </div>
      <div id="store-modifier" v-if="toggleSideDrawer === 'STORE_MODIFY'">
        <v-list class="flex justify-center">
          <v-list-subheader>
            <div class="flex gap-2 items-center m-4">
              <div class="">
                <p
                  class="text-xs badge badge-sm badge-accent text-accent-content"
                >
                  เลือกส่วนที่คูณต้องการปรับแต่ง
                </p>
                <FormKit
                  type="select"
                  v-model="toggleStoreOpts"
                  label="Layout Options"
                  placeholder="Select a Font size."
                  name="fontSizes"
                  :options="storeConfigOpts.storeOpts"
                  validation="required"
                />
              </div>
            </div>
            <hr class="border-gray-200 w-full" />
          </v-list-subheader>
        </v-list>
        <div>
          <ProductConfigUI
            v-if="toggleStoreOpts === 'PRODUCT_MODIFY'"
          ></ProductConfigUI>
          <HighlightConfigUI
            v-if="toggleStoreOpts === 'PRODUCT_LIST_MODIFY'"
          ></HighlightConfigUI>
          <FilterConfigUI
            v-if="toggleStoreOpts === 'FILTER_PRODUCT_MODIFY'"
          ></FilterConfigUI>
        </div>
      </div>
      <div
        id="player-login-modifier"
        v-if="toggleSideDrawer === 'PLAYER_LOGIN_MODIFY'"
      >
        <PlayerLoginConfigUI></PlayerLoginConfigUI>
      </div>
      <div
        id="client-modifier"
        v-if="toggleSideDrawer === 'CLIENT_ACCOUNT_MODIFY'"
      >
        <ClientConfigUI></ClientConfigUI>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>
<style scoped lang="scss">
.btn-z-20000 {
  z-index: 20000 !important;
}
</style>
