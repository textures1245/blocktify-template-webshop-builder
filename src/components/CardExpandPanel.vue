<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    itemPreview: {
      type: Boolean,
    },
  },
};
</script>
<template>
  <v-expansion-panel rounded="0" :title="title">
    <template v-slot:text>
      <v-card-item v-if="itemPreview">
        <div class="my-4 flex place-content-center">
          <slot name="item-preview"> </slot>
        </div>
        <p
          class="mb-4 underline underline-offset-2 text-xs text-center uppercase tracking-wider"
        >
          Item Preview
        </p>
      </v-card-item>
      <slot name="content"> </slot>
    </template>
  </v-expansion-panel>
</template>
<style lang="scss"></style>
