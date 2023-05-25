<script lang="ts">
export default {
  props: {
    itemLength: {
      type: Number,
      required: true,
    },
    itemId: Number,
  },
};
</script>
<template>
  <div>
    <p v-if="itemLength" class="text-sm font-semibold text-end">
      ทั้งหมด
      {{ itemLength }}
      รายการ
    </p>
    <div id="product-collection-group">
      <h2 v-if="itemId" class="hr">
        <span class="hr-text">{{ itemId + 1 }}</span>
      </h2>

      <slot name="form-controls"></slot>
    </div>
  </div>
</template>
<style lang="scss"></style>
