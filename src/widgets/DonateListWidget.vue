<script lang="ts">
import { ComputedRef, PropType, computed } from "vue";
import { Player, TopUpRanK, usePlayerStore } from "../store/actor/playerStore";
import IconAnimation from "../components/IconAnimation.vue";
import BadgeWidget from "./BadgeWidget.vue";
import { loadScript } from "vue-plugin-load-script";
export default {
  components: { BadgeWidget, IconAnimation },
  props: {
    avatar: String,
    players: {
      type: Array as PropType<TopUpRanK[]>,
      required: true,
    },
    sortAction: {
      type: String as PropType<"RECENT" | "TOP_DONATE">,
      required: true,
    },
  },

  mounted() {
    loadScript(import.meta.env.VITE_LOTTIE_API).then(
      () => (this.loadedIconScript = true)
    );
  },

  data() {
    return {
      loadedIconScript: false,
    };
  },
};
</script>
<template>
  <section id="top-donate" class="my-16">
    <div class="h-60">
      <v-toolbar class="!glass px-6" density="comfortable">
        <v-toolbar-title>
          <h1 class="text-base text-base-content font-semibold">
            {{
              sortAction === "TOP_DONATE"
                ? "อันดับการเติมเงินสูงสุด"
                : "อันดับการเติมเงินล่าสุด"
            }}
          </h1>
        </v-toolbar-title>
      </v-toolbar>
      <v-table
        v-if="players.length > 0"
        class="!text-sm mb-4"
        density="comfortable"
      >
        <thead class="bg-primary-focus">
          <tr>
            <th></th>
            <th class="text-left !text-primary-content">ผู้เล่น</th>
            <th class="text-left !text-primary-content">ยอดเติม</th>
            <th
              v-if="sortAction === 'RECENT'"
              class="text-left !text-primary-content"
            >
              ล่าสุดเมื่อ
            </th>
          </tr>
        </thead>
        <tbody class="bg-base-300 text-base-content">
          <tr v-for="(p, i) in players" :key="i">
            <td>
              <v-avatar
                size="32"
                :image="
                  p.avatar || 'https://minotar.net/helm/mhf_steve/600.png'
                "
                density="compact"
              ></v-avatar>
            </td>
            <td>{{ p.player_name }}</td>
            <td>{{ p.amount }}</td>
            <td v-if="p.created_at" class="text-xs">
              {{ new Date(+p.created_at * 1000).toLocaleDateString("th-TH") }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <div
        class="flex flex-col items-center gap-4 text-base-content bg-base-100 w-full h-40 py-4 justify-center"
        v-else
      >
        <lottie-player
          v-if="loadedIconScript"
          src="https://assets3.lottiefiles.com/packages/lf20_bpsjo66d.json"
          background="transparent"
          speed="1"
          class="w-8/12 h-4/6 fill-primary"
          loop
          autoplay
        ></lottie-player>
      
        <v-chip>ยังไม่ข้อมูลการเติมเงินในขณะนี้</v-chip>
      </div>
    </div>
  </section>
</template>
<style lang="scss"></style>
