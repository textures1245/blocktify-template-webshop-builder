<script lang="ts">
import { useProductStore } from "../store/product/productStore";
export default {
  setup() {
    const store = useProductStore();
    return { products: store.getProducts };
  },
};
</script>
<template>
  <v-card class="">
    <v-card-text>
      <article
        class="prose prose-blockquote:text-2xl prose-blockquote:text-primary-focus"
      >
        <blockquote class="w-8/12 font-semibold lg:w-10/12 mx-auto">
          แหล่งท่องเที่ยวยอดนิยมในเชียงใหม่
        </blockquote>
      </article>
      <v-sheet class="mx-auto" max-width="800">
        <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
          <v-slide-group-item
            v-for="(prod, i) in products.slice(0, 6)"
            v-slot="{ isSelected, selectedClass }"
          >
            <div class="flex flex-col justify-center">
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
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
<style lang=""></style>
