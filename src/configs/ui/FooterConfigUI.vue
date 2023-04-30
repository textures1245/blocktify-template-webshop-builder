<script lang="ts">
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";
export default {
  components: { CardExpand, CardExpandPanel },
  setup() {
    const store = useConfigComponentStore();
    return { config: store.getMainBodyConfig };
  },
};
</script>
<template>
  <CardExpand headline="คอนเทนต์หลัก (Highligh Contents)">
    <template #content>
      <div></div>
    </template>
  </CardExpand>
  <v-expansion-panels multiple>
    <CardExpandPanel :item-preview="false" title="ภาพสไลด์ (Image Carousel)">
      <template #content> </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style scoped lang="sass"></style>
