<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import { useConfigComponentStore } from "../configCPNStore";
export default {
  components: {
    CardExpand,
  },
  setup() {
    return {
      filters: useConfigComponentStore().getStoreConfig.filter,
      filterOpts: {
        PRICE: "หมวดราคา",
        HOT: "หมวดยอดนิยม",
        TYPE: "หมวดประเภท",
        DATE: "หมวดวันที่",
      },
    };
  },
};
</script>
<template>
  <CardExpand headline="หมวดกรองสินค้า">
    <template #content>
      <FormKit
        validation="required|min:1"
        v-model="filters.requires"
        type="checkbox"
        :options="filterOpts"
        label="เลือกตัวกรอก"
        help="โปรดเลือกหนึ่งอย่างหรือมากกว่านั้น"
        name="product-filters"
        :validation-messages="{
          required: 'จำเป็นต้องเลือกอย่างใดอย่างหนึ่ง'
        }"
      />
    </template>
  </CardExpand>
</template>
<style lang="scss"></style>
