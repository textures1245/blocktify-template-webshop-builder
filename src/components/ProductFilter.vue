<script lang="ts">
import { useProductStore } from "../store/product/productStore";
export default {
  emits: ["setProducts"],
  setup() {
    const store = useProductStore();
    const products = store.getProducts;
    const uniqueProdTypeSets = new Set<string>();
    for (const prod of products) {
      uniqueProdTypeSets.add(prod.type);
    }

    return { products, store, prodTypes: Array.from(uniqueProdTypeSets) };
  },
  data() {
    return {
      filters: {
        price: 0,
        popular: null,
        date: null,
        types: [],
      },
    };
  },
  mounted() {
    this.$emit("setProducts", this.products);
  },
  methods: {
    async onFiltering() {
      const results = await this.store.getProductsWithFilters(
        +this.filters.price,
        this.filters.types,
        !!this.filters.popular,
        !!this.filters.date
      );
      this.$emit("setProducts", results);
    },
  },
};
</script>
<template>
  <div class="shadow-md max-h-screen overflow-y-auto w-full">
    <v-card class="mx-auto" max-width="500">
      <v-card-text class="flex flex-col gap-4">
        <FormKit
          v-model="filters.price"
          type="radio"
          label="ราคา"
          :options="{
            100: 'น้อยกว่า 100',
            500: 'น้อยกว่า 500',
            1000: 'น้อยกว่า 1000',
          }"
          help="โปรดเลือกได้อย่างใดอย่างหนึ่ง"
        />
        <FormKit
          v-model="filters.popular"
          type="radio"
          label="ยอดฮิต"
          :options="{
            1: 'สินค้ายอดฮิตมากที่สุด',
            0: 'สินค้ายอดฮิตน้อยที่สุด',
          }"
          help="โปรดเลือกได้อย่างใดอย่างหนึ่ง"
        />
        <FormKit
          v-model="filters.types"
          type="checkbox"
          help="โปรดเลือกได้ตัวกรอกที่คุณต้องการ เลือกได้มากกว่าหนึ่ง"
          label="หมวดหมู่สินค้า"
          :options="prodTypes"
        />
        <FormKit
          v-model="filters.date"
          type="radio"
          label="วันที่"
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
