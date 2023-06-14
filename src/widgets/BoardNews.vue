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

                <v-dialog v-model="dialog[i]" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="absolute bottom-5 right-5 !text-base-content"
                      variant="tonal"
                      icon="mdi-eye-arrow-right-outline"
                    >
                    </v-btn>
                  </template>
                  <section  :data-theme="globalCSSConfig.themeColor">
                    <v-card class="shadow-xl">
                      <v-img
                        :src="info.image!"
                        cover
                        class="h-full w-full"
                      ></v-img>
                      <v-card-text
                        class="bg-gradient-to-t to-base-100 from-base-300"
                      >
                        <article
                          class="py-4 overflow-auto !text-base-content prose prose-sm prose-slate"
                        >
                          <h2>
                            {{ info.context.title }}
                          </h2>
                          <div
                            v-html="info.context.content"
                            class="indent-10"
                          ></div>
                        </article>
                      </v-card-text>
                    </v-card>
                    <v-btn
                      @click="dialog[i] = false"
                      size="small"
                      class="!btn-accent absolute -right-4 -top-4"
                      icon="mdi-close"
                    ></v-btn>
                  </section>
                </v-dialog>
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
import { useConfigComponentStore } from "../configs/configCPNStore";
export default {
  props: {
    props: Array as PropType<BoardNews[]>,
  },
  data() {
    return {
      dialog: [] as boolean[],
      globalCSSConfig: useConfigComponentStore().globalConfig,
    };
  },
  mounted() {
    // Initialize dialog properties based on the number of items in props array
    this.dialog = new Array(this.props?.length).fill(false);
  },
};
</script>
<style scoped lang="scss"></style>
