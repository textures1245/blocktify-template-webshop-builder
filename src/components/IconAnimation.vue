<script lang="ts">
import { loadScript } from "vue-plugin-load-script";

export default {
  emits: ["loadedScript"],
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
  },

  async mounted() {
    return loadScript(import.meta.env.VITE_LOTTIE_API).then(() =>
      this.$emit("loadedScript", true)
    );
  },
};
</script>
<template>
  <section
    id="animation-wrapper"
    class="flex flex-col gap-6 justify-center items-center px-8 text-center"
  >
    <div id="icon-wrapper"><slot name="icon"></slot></div>
    <h1 class="text-2xl font-semibold">{{ title }}</h1>
    <p class="text-md">{{ subtitle }}</p>
  </section>
</template>
<style lang="scss"></style>
