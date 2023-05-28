<script lang="ts">
import PlayerBadge from "../components/PlayerBadge.vue";
import CarouselList from "../components/CarouselList.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import DonateListWidget from "../widgets/DonateListWidget.vue";
export default {
  components: { PlayerBadge, CarouselList, DonateListWidget },
  setup() {
    return { config: useConfigComponentStore().getHeaderBarConfig };
  },
};
</script>
<template>
  <CarouselList :image-list="config.contents.carousel.images"></CarouselList>
</template>
<style lang="scss"></style>
