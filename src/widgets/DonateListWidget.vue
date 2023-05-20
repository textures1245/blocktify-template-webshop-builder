<script lang="ts">
import { PropType } from "vue";
import { Player, TopUpRanK, usePlayerStore } from "../store/actor/playerStore";
import BadgeWidget from "./BadgeWidget.vue";
export default {
  components: { BadgeWidget },
  props: {
    players: {
      type: Array as PropType<TopUpRanK[]>,
      required: true,
    },
    sortAction: {
      type: String as PropType<"RECENT" | "TOP_DONATE">,
      required: true,
    },
  },
  computed: {
    // getSortPlayers() {
    //   return this.sortAction === "TOP_DONATE"
    //     ? this.players
    //         .sort(
    //           (p1, p2) => p2.transaction.topUpTotal - p1.transaction.topUpTotal
    //         )
    //         .slice(0, this.limit)
    //     : this.players
    //         .sort(
    //           (p1, p2) =>
    //             p2.transaction.recentTopUpDate.seconds -
    //             p1.transaction.recentTopUpDate.seconds
    //         )
    //         .slice(0, this.limit);
    // },
  },
};
</script>
<template>
  <section id="top-donate">
    <div class="h-60">
      <v-toolbar class="!glass" density="comfortable">
        <v-toolbar-title>
          <h1 class="text-base">
            {{
              sortAction === "TOP_DONATE"
                ? "อันดับการเติมเงินสูงสุด"
                : "อันดับการเติมเงินล่าสุด"
            }}
          </h1>
        </v-toolbar-title>
      </v-toolbar>
      <v-table class="!text-sm" density="comfortable">
        <thead class="bg-primary-focus">
          <tr>
            <th></th>
            <th class="text-left !text-primary-content">ผู้เล่น</th>
            <th class="text-left !text-primary-content">ยอดเติม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in players" :key="i">
            <td>
              <v-avatar
                size="26"
                :image="'https://minotar.net/helm/mhf_steve/600.png'"
                density="compact"
              ></v-avatar>
            </td>
            <td>{{ p.player_name }}</td>
            <td>{{ p.amount }}</td>
            <p v-if="p.created_at" class="text-xs text-indent">
              ล่าสุดเมื่อ: {{ new Date(+p.created_at * 1000).getDate() }}
            </p>
          </tr>
        </tbody>
      </v-table>
    </div>
  </section>
</template>
<style lang="scss"></style>
