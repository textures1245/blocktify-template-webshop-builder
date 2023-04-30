<template>
  <div id="product-collection" class="h-auto">
    <v-toolbar density="compact" class="!bg-primary-focus">
      <v-toolbar-title class="!text-primary-content"
        ><v-icon icon="mdi-store"></v-icon>
        {{ title ? title : "รายการสินค้าเรียงตาม..." }}</v-toolbar-title
      >
    </v-toolbar>
    <v-card class="!max-h-[450px] overflow-auto">
      <v-card-text
        :class="[`grid gap-4 `, `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`]"
      >
        <div
          id="product-container"
          v-for="prod in products.slice(0, limit)"
          class="glass max-h-52 col-span-1"
        >
          <v-img :src="prod.imgSrc" :alt="prod.name"></v-img>
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
import { useProductStore } from "../store/product/productStore";
import { useDisplay } from "vuetify/lib/framework.mjs";
export default {
  props: {
    gridCols: {
      type: Number,
      default: 4,
    },
    limit: {
      type: Number,
      default: 8,
    },
    title: {
      type: String,
      default: "รายการสินค้าเรียงตาม ....",
    },
  },

  setup() {
    return { products: useProductStore().getProducts, screen: useDisplay() };
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
