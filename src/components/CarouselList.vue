<template>
  <v-card elevation="16" class="mx-auto">
    <v-carousel
      :continuous="false"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-circle"
      height="300"
    >
      <v-carousel-item
        :src="src || tempBg"
        cover
        v-for="(src, i) in imageList"
        :key="i"
      >
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
