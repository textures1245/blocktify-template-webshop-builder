<script lang="ts">
export default {
  emits: ["emitAction"],
  props: {
    itemId: {
      type: Number,
      required: true,
    },
    // scroll to the specific form control section id when press edit action
    scrollToId: {
      type: String,
      default: "none",
    },
  },

  methods: {
    onEmitAction(action: "EDIT" | "DELETE") {
      return this.$emit("emitAction", { action, itemId: this.itemId });
    },
  },
};
</script>
<template>
  <div class="flex justify-end">
    <v-btn-group density="comfortable" divided variant="outlined">
      <a :href="`#${scrollToId}`">
        <v-btn
          @click="() => onEmitAction('EDIT')"
          icon="mdi-circle-edit-outline"
          class="h-full"
        >
        </v-btn>
      </a>
      <v-btn icon="mdi-delete" @click="() => onEmitAction('DELETE')"></v-btn>
    </v-btn-group>
  </div>
</template>

<style lang="scss"></style>
