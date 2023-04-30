<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import { GlobalConfigCSS } from "../configCSS";
import { useConfigComponentStore } from "../configCPNStore";
import { onDeactivated, ref, Ref } from "vue";
export default {
  components: { CardExpand },
  setup() {
    const configStore = useConfigComponentStore();

    return { config: ref(configStore.getGlobalConfig), configStore };
  },
  data() {
    return {
      configSelectOpt: {
        themesColors: [
          "light",
          "dark",
          "cupcake",
          "bumblebee",
          "emerald",
          "corporate",
          "synthwave",
          "retro",
          "cyberpunk",
          "valentine",
          "halloween",
          "garden",
          "forest",
          "aqua",
          "lofi",
          "pastel",
          "fantasy",
          "wireframe",
          "black",
          "luxury",
          "dracula",
          "cmyk",
          "autumn",
          "business",
          "acid",
          "lemonade",
          "night",
          "coffee",
          "winter",
        ],
        fontSizes: ["xs", "sm", "md", "lg", "xl"],
        fontFamily: [
          "Kanit",
          "Anuphan",
          "Prompt",
          "Mitr",
          "Itim",
          "Chakra Petch",
          "Noto Sans Thai",
          "Taviraj",
          "Pattaya",
        ],
        btnVariants: ["text", "flat", "elevated", "tonal", "outlined", "plain"],
        btnExtraClasses: ["glass"],
        bgColorOpts: {
          "bg-base-300": "ยึดตามพื้นหลังสีทีม",
          "bg-white": "สีขาว",
          "bg-gray-100": "ทีขาวขวัญบุหรี่",
          "bg-gray-700": "สีดำเทา",
        },
      },

      isConfigHasChanged: false,
    };
  },
  mounted(): void {
    console.log(this.config);
  },

  unmounted() {
    if (this.isConfigHasChanged) console.log("Unmounted");
  },
  methods: {
    setNewConfig(data: GlobalConfigCSS) {
      console.log(data);
      this.configStore.setNewModifyConfig(data, "GLOBAL");
      console.log(this.configStore.getGlobalConfig);
    },

    // onChangedConfig(): boolean {
    //   console.log(this.tempConfig);
    //   return (
    //     this.tempConfig.themeColor == this.config.themeColor ||
    //     this.tempConfig.fontSize == this.config.fontSize ||
    //     this.tempConfig.fontFamily == this.config.fontFamily
    //   );
    // },
  },
};
</script>
<template>
  <FormKit
    type="form"
    :actions="false"
    submit-label="ใช้การตั้งค่านี้"
    @submit="setNewConfig"
  >
    <div class="flex flex-col w-full">
      <CardExpand headline="ทีมสีเว็บไซต์ (Color Theme)">
        <template #content>
          <FormKit
            v-model="config.themeColor"
            type="select"
            label="ได้โปรดเลือกทีมสำหรับเว็บไซต์ของคุณ"
            placeholder="Select a Theme color."
            name="themeColor"
            :options="configSelectOpt.themesColors"
            validation="required"
          />
        </template>
      </CardExpand>
      <CardExpand headline="พื้นหลังสีเว็บไซต์ (Background Color)">
        <template #content>
          <FormKit
            v-model="config.bgColor"
            type="select"
            label="ได้โปรดเลือกพื้นหลังสำหรับเว็บไซต์ของคุณ"
            placeholder="Select a Background color."
            name="bgColor"
            :options="configSelectOpt.bgColorOpts"
            validation="required"
          />
        </template>
      </CardExpand>
      <CardExpand headline="ขนาดของตัวอักษร (Font Size)">
        <template #content>
          <FormKit
            type="select"
            v-model="config.fontSize"
            label="ได้โปรดเลือกทีม สำหรับเว็บไซต์ของคุณ"
            placeholder="Select a Font size."
            name="fontSizes"
            :options="configSelectOpt.fontSizes"
            validation="required"
          />
        </template>
      </CardExpand>
      <CardExpand headline="ลักษณะของตัวอักษร (Font Style)">
        <template #content>
          <FormKit
            v-model="config.fontFamily"
            type="select"
            label="ได้โปรดเลือกทีม สำหรับเว็บไซต์ของคุณ"
            placeholder="Select a Font style."
            name="fontFamily"
            :options="configSelectOpt.fontFamily"
            validation="required"
          />
        </template>
      </CardExpand>
      <CardExpand :item-preview="true" headline="ลักษณะปุ่มกด (Button Style)">
        <template #item-preview>
          <v-btn
            :variant="config.btnStyle.variant || undefined"
            :class="[
              config.btnStyle.extraClass,
              '!bg-primary',
              '!text-primary-content',
            ]"
            >ปุ่มกด</v-btn
          >
        </template>
        <template #content>
          <FormKit
            v-model="config.btnStyle.variant"
            type="select"
            label="ลักษณะปุ่ม"
            placeholder="Select a Font style."
            name="btnVariantStyle"
            :options="configSelectOpt.btnVariants"
            validation="required"
          />
          <FormKit
            v-model="config.btnStyle.extraClass"
            type="checkbox"
            name="btnClassStyle"
            label="ลักษณะเพิ่มเติมพิเศษ"
            :options="configSelectOpt.btnExtraClasses"
          />
        </template>
      </CardExpand>
    </div>
  </FormKit>
</template>
<style lang="scss"></style>
