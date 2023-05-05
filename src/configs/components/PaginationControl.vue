<script lang="ts">
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["onPageChanged"],
  data() {
    return {
      currentPage: 1,
    };
  },

  mounted() {
    this.$emit("onPageChanged", this.paginatedItems);
  },

  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems(): any[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
    onPageChange(newPage: number) {
      this.currentPage = newPage;
      this.$emit("onPageChanged", this.paginatedItems);
    },
  },
};
</script>
<template>
  <v-pagination
    v-model="currentPage"
    @next="onPageChange(currentPage++)"
    @prev="onPageChange(currentPage--)"
    :length="totalPages"
  >
  </v-pagination>
</template>
<style lang="scss"></style>
