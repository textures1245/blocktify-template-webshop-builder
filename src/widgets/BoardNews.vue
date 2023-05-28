<template>
  <v-card class="bg-base-200 text-base-content">
    <v-carousel
      cycle
      height="400"
      :hide-delimiters="true"
      hide-delimiter-background
      show-arrows="hover"
    >
      <v-carousel-item v-for="(info, i) in props" :key="i">
        <v-sheet class="!glass !max-h-[920px]" height="100%">
          <div class="flex flex-col lg:grid grid-cols-2 h-full">
            <div class="duration-300 hover:h-full h-2/6 lg:h-full">
              <v-img :src="info.image!" cover class="h-full w-full"></v-img>
            </div>
            <div id="text-content-container" class="h-full">
              <v-container>
                <article
                  class="overflow-auto !text-base-content prose prose-sm prose-slate"
                >
                  <h1>
                    {{ info.context.title }}
                  </h1>
                  <div v-html="info.context.content" class="indent-10"></div>
                </article>

                <v-tooltip location="top" text="อ่าน">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="absolute bottom-5 right-5 !text-base-content"
                      variant="tonal"
                      icon="mdi-eye-arrow-right-outline"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </v-container>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script lang="ts">
import { PropType } from "vue";
import { BoardNews } from "../configs/configCSS";
export default {
  props: {
    props: Array as PropType<BoardNews[]>,
  },
};
</script>
<style lang=""></style>
