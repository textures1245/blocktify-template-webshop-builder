<script lang="ts">
import ProductCollectionSlide from "../widgets/ProductCollectionSlide.vue";
import ProductFilter from "../components/ProductFilter.vue";
import ProductList from "../components/ProductList.vue";
import { Product } from "../store/product/productStore";
import { useClientStore } from "../auth/store/authClientStore";
import { usePlayerStore } from "../store/actor/playerStore";
import CardProduct from "../components/CardProduct.vue";
import IconAnimation from "../components/IconAnimation.vue";
import { loadScript } from "vue-plugin-load-script";
export default {
  components: {
    ProductCollectionSlide,
    ProductFilter,
    ProductList,
    IconAnimation,
    CardProduct,
  },
  props: {},
  data() {
    return {
      products: <Product[]>[],
      isProductEmpty: true,
      dialog: false,
      player: usePlayerStore().getCurrentPlayer,
      onClientView: useClientStore().getIsClientAuth,
    };
  },
  async mounted() {
    return loadScript(import.meta.env.VITE_LOTTIE_API).then(() => true);
  },
  methods: {},
};
</script>
<template>
  <div
    v-if="products.length <= 0"
    class="flex my-10 h-full w-full justify-center items-center"
  >
    <IconAnimation
      title="ไม่พบไอเทม"
      subtitle="ลองกลับมาดูใหม่อีกรอบ เพื่อจะมีสินค้าใหม่เพิ่มเข้ามารอคุณอยู่"
    >
      <template #icon>
        <lottie-player
          src="https://assets1.lottiefiles.com/private_files/lf30_nfa4vjrl.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player>
      </template>
    </IconAnimation>
  </div>
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
    <div
      v-if="products.length > 0"
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
        @set-products="(prods: Product[]) => [(products = prods), (products.length > 0 ? isProductEmpty = false : isProductEmpty = true)]"
      ></ProductFilter>
    </div>
    <div
      v-if="products.length > 0"
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
      v-if="products.length > 0"
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
