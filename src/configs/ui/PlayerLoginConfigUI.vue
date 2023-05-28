<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import { useConfigComponentStore } from "../configCPNStore";
import FileControl from "../components/FileControl.vue";
import { ref } from "vue";
export default {
  components: { CardExpand, CardExpandPanel, FileControl },
  setup() {
    return {
      config: ref(useConfigComponentStore().getPlayerLoginConfig),
    };
  },

  watch: {
    config() {
      console.log(this.config);
    },
  },
  data() {
    return {
      extraOpts: {
        side: {
          "order-1": "หน้าต่างล็อกอินอยู่ด้านซ้าย",
          "order-0": "หน้าต่างล็อกอินอยู่ด้านขวา",
        },
        colorThemes: {
          "from-primary": "primary",
          "from-secondary": "secondary",
          "from-accent": "accent",
        },
      },
    };
  },
};
</script>
<template>
  <section>
    <CardExpand :item-preview="true" headline="รูปภาพ">
      <template #item-preview>
        <v-img sizes="64" :src="config.sideImageUrl" />
      </template>
      <template #content>
        <FileControl
          :storage="config.sideImageUrl"
          action="image"
        ></FileControl>
      </template>
    </CardExpand>
    <CardExpand headline="เพิ่มเติม">
      <template #content>
        <FormKit
          name="side"
          v-model="config.extraClass.loginPosition"
          label="ตำแหน่งของหน้าต่างล็อกอิน"
          type="radio"
          :validation-messages="{
            max: 'แต่ละอันห้ามเลือกเกินมากกว่าหนึ่ง',
            min: ' แต่ละส่วนควรมีตัวเลือก',

            required: 'ห้ามว่าง เลือกอย่างใดอย่างหนึ่ง',
          }"
          validation="required"
          :options="extraOpts.side"
        >
        </FormKit>
        <FormKit
          validation="required"
          name="colorTheme"
          v-model="config.extraClass.colorTheme"
          :validation-messages="{
            max: 'แต่ละอันห้ามเลือกเกินมากกว่าหนึ่ง',
            min: ' แต่ละส่วนควรมีตัวเลือก',
            required: 'ห้ามว่าง เลือกอย่างใดอย่างหนึ่ง',
          }"
          label="โทนสีเลือกตามทีม"
          type="radio"
          :options="extraOpts.colorThemes"
        >
        </FormKit>
      </template>
    </CardExpand>
  </section>
</template>
<style lang="scss"></style>
