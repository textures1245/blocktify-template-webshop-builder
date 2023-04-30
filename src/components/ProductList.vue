<script lang="ts">
import { PropType } from "vue";
import { Product } from "../store/product/productStore";
import CardProduct from "./CardProduct.vue";

export default {
  components: { CardProduct },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <CardProduct :product="prod" v-for="prod in products"></CardProduct>
  </div>
</template>
<style lang=""></style>
