<template>
  <div
    class="grid col-span-full md:col-span-1 place-items-center md:place-items-stretch grid-cols-2 md:grid-cols-1 md:flex flex-col gap-10"
  >
    <PlayerBadge
      v-if="config.contents.required.includes('playerBadge')"
      :bgImg="{
        isCustom: config.contents.playerBadge.bg.custom,
        src: config.contents.playerBadge.bg.src,
      }"
    ></PlayerBadge>
    <DonateListWidget
      v-if="config.contents.required.includes('topDonate')"
      :limit="config.contents.recentDonate.limit"
      sort-action="RECENT"
      :players="players"
    ></DonateListWidget>
    <DonateListWidget
      v-if="config.contents.required.includes('recentDonate')"
      :limit="config.contents.topDonate.limit"
      sort-action="TOP_DONATE"
      :players="players"
    ></DonateListWidget>
  </div>
</template>
<script lang="ts">
import PlayerBadge from "../components/PlayerBadge.vue";
import DonateListWidget from "../widgets/DonateListWidget.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { usePlayerStore } from "../store/actor/playerStore";
export default {
  components: { PlayerBadge, DonateListWidget },
  setup() {
    return {
      players: usePlayerStore().getPlayers,
      config: useConfigComponentStore().getSidebarConfig,
    };
  },
};
</script>
<style lang="scss"></style>
