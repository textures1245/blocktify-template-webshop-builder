<template>
  <div id="product-collection" class="h-auto">
    <v-toolbar density="compact" class="!bg-primary-focus">
      <v-toolbar-title class="!text-primary-content"
        ><v-icon icon="mdi-store"></v-icon> {{ titleByAction }}</v-toolbar-title
      >
    </v-toolbar>
    <v-card class="!max-h-[450px] overflow-auto">
      <v-card-text
        :class="[`grid gap-4 `, `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`]"
      >
        <div
          id="product-container"
          v-for="prod in products.slice(0, props?.limits)"
          class="glass max-h-52 col-span-1"
        >
          <v-img
            cover
            class="!h-5/6"
            :src="prod.imgSrc"
            :alt="prod.name"
          ></v-img>
          <div
            class="glass mix-blend-color-burn text-sm lg:text-lg font-bold h-[20%] flex w-full justify-around absolute bottom-0 items-center"
          >
            <h1 id="prodName">{{ prod.name }}</h1>
            <p class="">x{{ prod.quantity }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Product, useProductStore } from "../store/product/productStore";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ProductCollectionGrid } from "../configs/configCSS";
import { PropType } from "vue";
export default {
  props: {
    props: Object as PropType<ProductCollectionGrid>,
  },

  setup() {
    const store = useProductStore();
    return { screen: useDisplay(), store };
  },

  computed: {
    titleByAction() {
      switch (this.props?.sortAction) {
        case "HIGHTEST_PRICE":
          return "รายการสินค้าราคาสูงสุด";
        case "LOWEST_PRICE":
          return "รายการสินค้าราคาต่ำสุด";
        case "HIGHEST_SOLD_OFF":
          return "รายการสินค้าที่นิยมที่สุด";
        case "LOWEST_SOLD_OFF":
          return "รายการสินค้นมาใหม่";
        default:
          return "รายการสินค้าเรียงตาม...";
      }
    },
  },

  async mounted() {
    this.products = await this.getProductsByAction(this.props!.sortAction);
  },

  data() {
    return {
      products: <Product[]>[],
    };
  },

  methods: {
    async getProductsByAction(action: string) {
      switch (action) {
        case "HIGHTEST_PRICE":
          return this.store.getProducts.sort((p1, p2) => p2.price - p1.price);
        case "LOWEST_PRICE":
          return this.store.getProducts.sort((p1, p2) => p1.price - p2.price);
        case "HIGHEST_SOLD_OFF":
          return await this.store.getProductsWithFilters(0, [], true, false);
        case "LOWEST_SOLD_OFF":
          return await this.store.getProductsWithFilters(0, [], false, false);
        default:
          return this.store.getProducts;
      }
    },
  },

  // computed: {
  //   cols() {
  //     return `grid-cols-${this.gridCols - 2} md:!grid-cols-${
  //       this.gridCols - 1
  //     } lg:grid-cols-${this.gridCols}`;
  //   },
  // },
};
</script>
<style lang="scss"></style>
