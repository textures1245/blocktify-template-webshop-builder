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
  <!-- <div id="header-bar-container" class="z-50">
    <div id="header-bar-body" class="w-full rounded-lg min-h-full">
      <div
        class="w-full h-full grid-rows-2 grid gap-y-10 xl:gap-y-0 grid-cols-2 xl:grid-cols-4"
      >
        <div
          class="col-span-2 xl:row-span-2 xl:col-span-3 justify-items-center"
        ></div>
        <div class="justify-self-center">
          <PlayerBadge></PlayerBadge>
        </div>
        <div class="justify-self-center -mt-4">
          <TopDonateWidget></TopDonateWidget>
        </div>
      </div>
    </div>
  </div> -->
</template>
<style lang="scss"></style>
