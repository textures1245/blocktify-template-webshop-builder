<script lang="ts">
import { Ref, ref } from "vue";
import { useClientFeatureStore, Action } from "../store/clientFeatureStore";
import AppBarConfigUI from "../configs/ui/AppBarConfigUI.vue";
import FooterConfigUI from "../configs/ui/FooterConfigUI.vue";
import GlobalCSSConfigUI from "../configs/ui/GlobalCSSConfigUI.vue";
import HeaderBarConfigUI from "../configs/ui/HeaderBarConfigUI.vue";
import MainBodyConfigUI from "../configs/ui/MainBodyConfigUI.vue";
import BannerConfigUI from "../configs/ui/BannerConfigUI.vue";
import SideBaeConfigUI from "../configs/ui/SidebaeConfigUI.vue";

export default {
  components: {
    AppBarConfigUI,
    FooterConfigUI,
    GlobalCSSConfigUI,
    HeaderBarConfigUI,
    MainBodyConfigUI,
    BannerConfigUI,
    SideBaeConfigUI,
  },
  setup() {
    return {
      actions: useClientFeatureStore().getClientFeatures,
    };
  },
  data() {
    return {
      toggleSideDrawer: <Ref<Action>>ref("NONE"),
      toggleLayoutOpts: "APPBAR_MODIFY",
      applySetting: {
        icon: "mdi-send-circle",
        title: "ยืนยันการตั้งค่า",
        value: "applySetting",
      },
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
    };
  },
  methods: {
    onApply() {},
  },
};
</script>
<template>
  <v-navigation-drawer elevation="4" :rail="true" permanent>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="a in actions"
        :prepend-icon="a.icon || 'mdi-icon'"
        @click="() => (toggleSideDrawer = a.action)"
        :title="a.title"
        :value="a.action"
      ></v-list-item>

      <!--- Apply Setting -->
    </v-list>
    <template v-slot:append>
      <div>
        <v-list density="compact" nav>
          <v-list-item
            class="!text-primary-focus"
            :prepend-icon="applySetting.icon"
            @click="() => onApply"
            :title="applySetting.title"
            :value="applySetting.value"
          ></v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
  <v-navigation-drawer
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
    <v-card variant="text" class="mx-auto" max-width="500">
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
          <SideBaeConfigUI
            v-if="toggleLayoutOpts === 'SIDEBAR_MODIFY'"
          ></SideBaeConfigUI>
        </v-list>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>
<style lang=""></style>