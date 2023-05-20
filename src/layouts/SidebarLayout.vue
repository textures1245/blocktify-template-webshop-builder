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
    <Suspense>
      <DonateListWidget
        v-if="config.contents.required.includes('topDonate')"
        sort-action="RECENT"
        :players="topUpRanks"
      ></DonateListWidget>
    </Suspense>
    <Suspense>
      <DonateListWidget
        v-if="config.contents.required.includes('recentDonate')"
        sort-action="TOP_DONATE"
        :players="recentTopUpRanks"
      ></DonateListWidget>
    </Suspense>
  </div>
</template>
<script lang="ts">
import PlayerBadge from "../components/PlayerBadge.vue";
import DonateListWidget from "../widgets/DonateListWidget.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { TopUpRanK, usePlayerStore } from "../store/actor/playerStore";
export default {
  components: { PlayerBadge, DonateListWidget },
  setup() {
    return {
      config: useConfigComponentStore().getSidebarConfig,
    };
  },
  data() {
    return {
      recentTopUpRanks: [] as TopUpRanK[],
      topUpRanks: [] as TopUpRanK[],
    };
  },

  async mounted() {
    this.recentTopUpRanks = await this.getTopUpRanks(
      "RECENT",
      this.config.contents.recentDonate.limit
    );
    this.topUpRanks = await this.getTopUpRanks(
      "TOP_DONATE",
      this.config.contents.recentDonate.limit
    );
  },

  methods: {
    async getTopUpRanks(action: "RECENT" | "TOP_DONATE", limit: number) {
      const ranks = await usePlayerStore().fetchTopUpPlayersRanking(
        action,
        limit
      );
      return ranks;
    },
  },
};
</script>
<style lang="scss"></style>
