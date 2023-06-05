<template>
  <v-card elevation="16" class="mx-auto">
    <v-carousel
      class="!bg-secondary-focus"
      :continuous="true"
      show-arrows="hover"
      hide-delimiter-background
      next-icon="!btn-primary"
      prev-icon="!btn-primary"
      cycle
      delimiter-icon="mdi-circle"
      height="300"
    >
      <v-carousel-item v-for="(src, i) in imageList" :key="i">
        <template #default>
          <img :src="src || tempBg" class="h-full w-full" />
        </template>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script lang="ts">
import { PropType } from "vue";
export default {
  props: {
    imageList: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  data() {
    return {
      tempBg:
        "https://preview.redd.it/s2c0viilldj41.png?auto=webp&s=c214655e88edf1066accda732e6676089ee45da2",
    };
  },
};
</script>
<style scoped lang="scss"></style>
