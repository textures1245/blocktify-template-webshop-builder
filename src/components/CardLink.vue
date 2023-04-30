<script lang="ts">
export default {
  props: {
    linkName: {
      type: String,
      default: "Link Name",
    },
  },
};
</script>
<template>
  <v-card class=" mc-block-dirt-bg flex h-28 w-56 cursor-pointer">
    <v-card-text class="flex backdrop-blur-sm flex-col justify-center items-center">
      <h1 class="animated font-semibold">{{ linkName }}</h1>
      <p class="text-white text-base">subtitle</p>
    </v-card-text>
  </v-card>
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
