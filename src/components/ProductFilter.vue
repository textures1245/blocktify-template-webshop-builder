<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import { useProductStore } from "../store/product/productStore";
import { storeToRefs } from "pinia";
export default {
  emits: ["setProducts"],
  setup() {
    const store = useProductStore();
    let { products } = storeToRefs(store);
    return {
      products,
      store,
      filterSelectors: useConfigComponentStore().getStoreConfig.filter,
      prodTypes: store.getProductTypes,
    };
  },
  data() {
    return {
      filters: {
        price: 0,
        popular: <any>null,
        date: <any>null,
        types: [],
      },
    };
  },
  watch: {
    products() {
      this.$emit("setProducts", this.products);
      this.store.onInitializeUniqueProductType();
    },
  },

  mounted() {
    this.$emit("setProducts", this.products);
  },
  methods: {
    async onFiltering() {
      const results = await this.store.getProductsWithFilters(
        +this.filters.price,
        this.filters.types,
        Boolean(+this.filters.popular),
        Boolean(+this.filters.date)
      );
      this.$emit("setProducts", results);
    },
  },
};
</script>
<template>
  <div class="shadow-md drop-shadow-md max-h-screen overflow-y-auto w-full">
    <v-card class="mx-auto bg-base-200 text-base-content" max-width="500">
      <v-card-text class="flex flex-col gap-4">
        <FormKit
          v-if="filterSelectors.requires.includes('PRICE')"
          v-model="filters.price"
          type="radio"
          label="ราคา"
          help-class="text-base-content"
          :options="{
            100: 'น้อยกว่า 100',
            500: 'น้อยกว่า 500',
            1000: 'น้อยกว่า 1000',
          }"
          help="โปรดเลือกได้อย่างใดอย่างหนึ่ง"
        />
        <FormKit
          v-if="filterSelectors.requires.includes('HOT')"
          v-model="filters.popular"
          type="radio"
          label="ยอดฮิต"
          help-class="text-base-content"
          :options="{
            1: 'สินค้ายอดฮิตมากที่สุด',
            0: 'สินค้ายอดฮิตน้อยที่สุด',
          }"
          help="โปรดเลือกได้อย่างใดอย่างหนึ่ง"
        />
        <FormKit
          v-if="filterSelectors.requires.includes('TYPE')"
          v-model="filters.types"
          type="checkbox"
          help="โปรดเลือกได้ตัวกรอกที่คุณต้องการ เลือกได้มากกว่าหนึ่ง"
          label="หมวดหมู่สินค้า"
          :options="prodTypes"
          help-class="text-base-content"
        />
        <FormKit
          v-if="filterSelectors.requires.includes('DATE')"
          v-model="filters.date"
          type="radio"
          label="วันที่"
          help-class="text-base-content"
          :options="{
            1: 'มาใหม่ล่าสุด',
            0: 'เก่าที่สุด',
          }"
          help="Configure your car’s trim options"
        />
      </v-card-text>
    </v-card>
  </div>
  <v-btn
    size="small"
    @click="() => onFiltering()"
    class="!btn-primary relative -bottom-2"
    >กรอกฟิวเตอร์ที่เลือก</v-btn
  >
</template>

<style lang=""></style>
