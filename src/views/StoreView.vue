<script lang="ts">
import ProductCollectionSlide from "../widgets/ProductCollectionSlide.vue";
import ProductFilter from "../components/ProductFilter.vue";
import ProductList from "../components/ProductList.vue";
import { Product } from "../store/product/productStore";
import { useClientStore } from "../auth/store/authClientStore";
import { usePlayerStore } from "../store/actor/playerStore";
import CardProduct from "../components/CardProduct.vue";
export default {
  components: {
    ProductCollectionSlide,
    ProductFilter,
    ProductList,
    CardProduct,
  },
  props: {},
  data() {
    return {
      products: <Product[]>[],
      dialog: false,
      player: usePlayerStore().getCurrentPlayer,
      onClientView: useClientStore().getIsClientAuth,
    };
  },
  methods: {},
};
</script>
<template>
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :variants="{ custom: { scale: 1.1 } }"
      :delay="200"
      id="product-slide"
      class="col-span-full"
    >
      <ProductCollectionSlide></ProductCollectionSlide>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :variants="{ custom: { scale: 1.1 } }"
      :delay="200"
      class="col-span-1 hidden lg:block"
    >
      <ProductFilter
        @set-products="(prods: Product[]) => (products = prods)"
      ></ProductFilter>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :variants="{ custom: { scale: 1.1 } }"
      :delay="200"
      class="col-span-1 absolute right-5 bottom-5 block z-10 lg:hidden"
    >
      <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-filter-cog-outline"
            class="!btn-secondary"
            v-bind="props"
          ></v-btn>
        </template>
        <ProductFilter
          @set-products="(prods: Product[]) => (products = prods)"
        ></ProductFilter>
      </v-dialog>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :variants="{ custom: { scale: 1.1 } }"
      :delay="200"
      class="lg:col-span-2 max-h-screen overflow-auto"
    >
      <div class="flex flex-col gap-2">
        <CardProduct
          :player="
            Boolean(player)
              ? { playerName: player?.playerName! }
              : { playerName: null }
          "
          :product="prod"
          v-for="prod in products"
        ></CardProduct>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
