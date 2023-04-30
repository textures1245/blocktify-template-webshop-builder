import { defineStore } from "pinia";

export type Action =
  | "GLOBAL_CSS_CONFIGURE"
  | "LAYOUT_MODIFY"
  | "NONE"
  | "APPBAR_MODIFY"
  | "HEADER_MODIFY"
  | "MAIN_CONTENT_MODIFY"
  | "FOOTER_MODIFY"
  | "BANNER_MODIFY"
  | "SIDEBAR_MODIFY";

export type FeatureAction = {
  title: string;
  action: Action;
  icon?: string;
  help?: string;
  subActions?: FeatureAction[];
};

export const useClientFeatureStore = defineStore("useClientFeatureStore", {
  state: () => ({
    clientFeatureActions: <FeatureAction[]>[
      {
        title: "ตั้งค่าพื้นฐานการตกแต่ง",
        action: "GLOBAL_CSS_CONFIGURE",
        icon: "mdi-auto-fix",
      },
      {
        title: "แก้ไข้เว็บไซต์",
        action: "LAYOUT_MODIFY",
        icon: "mdi-application-cog-outline",
        subActions: [
          {
            title: "แอปบาร์ (App Bar)",
            help: "บนสุด",
            action: "APPBAR_MODIFY",
            icon: "mdi-auto-fix",
          },
          {
            title: "เฮดเดอร์บาร์ (Header Bar)",
            help: "รองจากบนสุด",
            action: "HEADER_MODIFY",
            icon: "mdi-auto-fix",
          },
          {
            title: "คอนเทนต์หลัก (Main Content)",
            help: "ส่วนที่อยู่ตรงกลาง (ส่วนนี้เฉพาะหน้าหลัก)",
            action: "MAIN_CONTENT_MODIFY",
            icon: "mdi-auto-fix",
          },
          {
            title: "คอนเทนต์ด้างล่าง (Footer Content)",
            help: "อยู่ล่างสุด",
            action: "FOOTER_MODIFY",
            icon: "mdi-auto-fix",
          },
        ],
      },
    ],
  }),
  getters: {
    getClientFeatures: (state) => state.clientFeatureActions,
  },
  actions: {},
});
