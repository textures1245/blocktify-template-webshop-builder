<script lang="ts">
import { Product } from "../store/product/productStore";
import { PropType, ref } from "vue";
import { useProductStore } from "../store/product/productStore";

import Swal from "sweetalert2";

export default {
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },

    player: Object as PropType<{ playerName: string | null }>,
  },

  setup() {
    return {
      store: useProductStore(),
    };
  },

  data() {
    return {
      disableBtnWhilePerformAction: ref(false),
    };
  },

  methods: {
    async onBuyProduct(productID: string) {
      this.disableBtnWhilePerformAction = true;
      this.store.buyProduct(this.player?.playerName!, productID).then((res) => {
        this.disableBtnWhilePerformAction = false;
        Swal.fire({
          icon: res.status,
          titleText: res.msg,
        });
      });
    },
  },
};
</script>
<template>
  <v-card class="bg-base-200 text-base-content" :id="product.id" elevation="2">
    <v-card-text class="grid sm:grid-cols-3">
      <div
        id="product-image"
        class="col-span-2 place-self-center sm:col-span-1"
      >
        <img class="w-full h-full" :src="product.imgSrc" />
      </div>
      <div class="col-span-2">
        <v-container>
          <div id="product-detail" class="grid gap-3 grid-row-4">
            <article
              id="product-content"
              class="row-span-2 prose-sm max-h-28 h-28 overflow-auto"
            >
              <h2>{{ product.name }}</h2>
              <div id="tags-group" class="flex gap-2 -my-2">
                <v-chip size="small" density="compact" class="!btn-secondary">
                  {{ product.type }}
                </v-chip>
              </div>
              <blockquote class="text-xs" v-html="product.desc"></blockquote>
            </article>
            <div id="product-price-detail" class="row-span-1 lg:flex grid">
              <div id="price-container" class="stats w-full shadow">
                <div id="price" class="stat max-w-[100px] xl:max-w-none">
                  <div class="stat-title">ราคา</div>
                  <div class="stat-value">{{ product.price }}</div>
                  <div class="stat-desc">21% more than last month</div>
                </div>
                <v-btn
                  :disabled="disableBtnWhilePerformAction"
                  @click="onBuyProduct(product.id.toString())"
                  v-if="player?.playerName !== null"
                  id="buy-action"
                  size="large"
                  class="!btn-success"
                >
                  <span
                    v-if="disableBtnWhilePerformAction"
                    class="loading loading-spinner"
                  ></span>
                  ซื้อ</v-btn
                >
              </div>
            </div>
            <div class="row-span-1 place-content-end place-items-center">
              <div id="stats-group" class="flex gap-0 items-start">
                <v-btn
                  prepend-icon="mdi-cart-heart"
                  density="comfortable"
                  size="small"
                  variant="plain"
                  >สั่งซื้อ {{ product.totalSales }}</v-btn
                >
                <v-btn
                  density="comfortable"
                  prepend-icon="mdi-package-variant-closed-check"
                  size="small"
                  variant="plain"
                  >จำนวน {{ product.quantity }}</v-btn
                >
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss"></style>
