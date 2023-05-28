<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import { Product, useProductStore } from "../store/product/productStore";
export default {
  setup() {
    const store = useProductStore();
    const storeConfig = useConfigComponentStore().getStoreConfig;
    return {
      store,
      storeConfig,
    };
  },

  async mounted() {
    this.products = (
      await this.getProductsByAction(
        this.storeConfig.highlightProducts.sortAction
      )
    ).slice(0, this.storeConfig.highlightProducts.limits);
  },

  data() {
    return { products: <Product[]>[] };
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
    scrollToSection(sectionId: number | string) {
      const element = document.getElementById(sectionId as string);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>
<template>
  <v-card class="bg-base-200">
    <v-card-text>
      <article
        class="prose prose-blockquote:text-2xl prose-blockquote:!text-base-content"
      >
        <blockquote class="w-8/12 font-bold lg:w-10/12 mx-auto">
          {{ storeConfig.highlightProducts.title || "เขียนข้อความตรงนี้" }}
        </blockquote>
      </article>
      <v-sheet class="mx-auto bg-base-200 text-base-content" max-width="800">
        <Suspense>
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item
              v-for="(prod, i) in products"
              v-slot="{ isSelected, selectedClass }"
            >
              <a
                @click.prevent="scrollToSection(prod.id)"
                class="flex flex-col justify-center"
              >
                <v-avatar
                  class="hover:shadow-xl hover:bg-base-300 duration-300 transition cursor-pointer"
                  :image="prod.imgSrc"
                  :class="['ma-4', selectedClass]"
                  height="200"
                  width="100"
                  size="100"
                >
                  <div class="d-flex fill-height align-center justify-center">
                    <v-scale-transition>
                      <v-icon
                        v-if="isSelected"
                        color="white"
                        size="48"
                        icon="mdi-close-circle-outline"
                      ></v-icon>
                    </v-scale-transition>
                  </div>
                </v-avatar>
                <p class="text-center">{{ prod.name }}</p>
              </a>
            </v-slide-group-item>
          </v-slide-group>
        </Suspense>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
<style lang=""></style>
