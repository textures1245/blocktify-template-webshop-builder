<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
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
