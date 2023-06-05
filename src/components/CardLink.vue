<script lang="ts">
import { PropType } from "vue";
import { CardLink } from "../configs/configCSS";
export default {
  props: {
    props: {
      type: Object as PropType<CardLink>,
      required: true,
    },
  },
};
</script>
<template>
  <div class="w-full px-auto">
    <v-card
      :href="props?.linkUrl"
      target="_blank"
      :style="{
        backgroundImage: `url(${
          props?.bgUrl
            ? props.bgUrl
            : 'https://e0.pxfuel.com/wallpapers/1010/712/desktop-wallpaper-minecraft-grass-block-box-dirt-texture-minecraft-minecraft-thumbnail.jpg'
        })`,
      }"
      class="h-32 w-96 sm:w-[30rem] lg:w-48 xl:w-60 flex bg-cover cursor-pointer"
    >
      <v-card-text
        class="flex backdrop-blur-sm flex-col justify-center items-center"
      >
        <h1 class="animated font-semibold">{{ props?.title }}</h1>
        <p class="text-white text-base">{{ props?.subtitle }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss">
.mc-block-dirt-bg {
  background-image: url("https://e0.pxfuel.com/wallpapers/1010/712/desktop-wallpaper-minecraft-grass-block-box-dirt-texture-minecraft-minecraft-thumbnail.jpg");
}
.animated {
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  background: url("https://i.ibb.co/89Cf3dm/text-bg.png") no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: moveBg 90s linear infinite;
  -webkit-animation: moveBg 90s linear infinite;
}

/* Text Background Animation */
@keyframes moveBg {
  0% {
    background-position: 0% 30%;
  }

  100% {
    background-position: 100% 50%;
  }
}
</style>
