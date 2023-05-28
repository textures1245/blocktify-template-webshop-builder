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
        <v-tooltip text="แก้ไข" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              @click="() => onEmitAction('EDIT')"
              icon="mdi-circle-edit-outline"
              class="h-full text-info"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </a>
      <v-tooltip text="ลบ" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-error"
            icon="mdi-delete"
            @click="() => onEmitAction('DELETE')"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-btn-group>
  </div>
</template>

<style lang="scss"></style>
