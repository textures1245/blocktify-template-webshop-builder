<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";

export default {
  components: { CardExpand },
  setup() {
    return {
      config: useConfigComponentStore().getStoreConfig,
    };
  },

  data() {
    return {
      sortActionOpts: {
        HIGHTEST_PRICE: "เรียงจากราคาสูงสุดที่สุด",
        HIGHEST_SOLD_OFF: "เรียงจากยอดขายสูงสุด",
        LOWEST_PRICE: "เรียงจากราคาน้อยที่สุด",
        LOWEST_SOLD_OFF: "เรียงจากยอดขายน้อยที่สุด",
        CUSTOM: "จัดเรียง (*กำลังพัฒนา*)",
      },
    };
  },
};
</script>
<template>
  <CardExpand :item-preview="false" headline="ส่วนการแสดงสินค้าแบบพิเศษ">
    <template #content>
      <div class="text-sm">
        <FormKit
          v-model="config.highlightProducts.title"
          label="ข้อความที่ต้องการโชว์"
          name="title"
          type="text"
        ></FormKit>
        <FormKit
          v-model="config.highlightProducts.sortAction"
          type="select"
          :options="sortActionOpts"
          label="เลือกฟิวเตอร์ที่ต้องการจัดเรียง"
          name="sort-action"
        ></FormKit>
        <FormKit
          v-model="config.highlightProducts.limits"
          type="number"
          min="0"
          label="เลือกลิมิตที่ต้องการโชว์สินค้า"
          name="limits"
        ></FormKit>
      </div>
    </template>
  </CardExpand>
</template>
<style lang="scss"></style>
