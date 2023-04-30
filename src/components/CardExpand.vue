<script lang="ts">
export default {
  props: {
    headline: {
      type: String,
      required: true,
    },
    itemPreview: Boolean,
  },
};
</script>
<template>
  <v-card
    rounded="0"
    :border="0"
    class="border-b-2"
    variant="elevated"
    elevation="2"
  >
    <v-toolbar :border="0" density="compact" class="!bg-primary-focus">
      <v-card-title class="!text-sm !text-primary-content">{{
        headline
      }}</v-card-title>
    </v-toolbar>
    <v-card-item v-if="itemPreview">
      <div class="my-4 flex place-content-center">
        <slot name="item-preview"> </slot>
      </div>
      <p
        class="underline underline-offset-2 text-xs text-center uppercase tracking-wider"
      >
        Item Preview
      </p>
    </v-card-item>
    <v-card-item class="!mt-4">
      <div class="!px-2">
        <slot name="content" class=""> </slot>
      </div>
    </v-card-item>
  </v-card>
</template>
<style lang="scss"></style>
