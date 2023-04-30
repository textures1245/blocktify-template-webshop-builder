<script lang="ts">
import { useConfigComponentStore } from "../configCPNStore";
import CardExpand from "../../components/CardExpand.vue";
export default {
  components: { CardExpand },
  setup() {
    return { config: useConfigComponentStore().getAppBarConfig };
  },

  data() {
    return {
      configOpts: {
        logoPositionOpts: {
          prepend: "ด้านซ้ายสุด",
          append: "ด้านขวาสุด",
        },
        bgOpts: {
          isHave: {
            false: "ยึดตามสีทีมเป็นหลัก",
            true: "เลือกพื้นหลังของแอปบาร์",
          },
        },
        avatarOpts: [
          "none",
          "rounded",
          "rounded-full",
          "mask mask-squircle",
          "mask mask-hexagon",
          "mask mask-triangle",
        ],
      },
    };
  },
};
</script>
<template>
  <CardExpand :item-preview="true" headline="โลโก้ (Logo)">
    <template #item-preview>
      <div class="avatar h-16 border-2">
        <v-img
          src="https://www.nine10.ca/wp-content/uploads/2012/07/the-meaning-of-colours.jpg"
          :class="config.avatar"
        ></v-img>
      </div>
    </template>
    <template #content>
      <FormKit
        type="file"
        label="Logo Image"
        name="logoImg"
        placeholder="Select a Logo Image."
        validation="required"
      ></FormKit>
      <FormKit
        type="select"
        label="รูปแบบ"
        name="logoAvatar"
        :options="configOpts.avatarOpts"
        v-model="config.avatar"
        placeholder="Select a Logo Avatar."
        validation="required"
      ></FormKit>
    </template>
  </CardExpand>
  <CardExpand headline="ตำแหน่งที่ตั้ง (Elements Position)">
    <template #content>
      <FormKit
        type="select"
        label="Logo Position"
        name="logoPosition"
        v-model="config.position"
        placeholder="Select a Logo Position."
        :options="configOpts.logoPositionOpts"
        validation="required"
      ></FormKit>
    </template>
  </CardExpand>
  <CardExpand headline="พื้นหลังของแอปบาร์ (App Bar Background)">
    <template #content>
      <FormKit
        label="โปรดเลือก"
        type="radio"
        v-model="config.bgImg.isHave"
        name="isHaveBgImg"
        :options="configOpts.bgOpts.isHave"
      />
      <FormKit
        v-if="config.bgImg.isHave === 'true'"
        label="โปรดเลือกรูปภาพ Background"
        type="file"
        name="bgImgSrc"
      />
      <FormKit
        v-if="config.bgImg.isHave === 'false'"
        label="รูปแบบ Glass"
        type="checkbox"
        name="glass-navbar"
        v-model="config.glass"
      />
    </template>
  </CardExpand>
</template>
<style scoped lang="sass"></style>
