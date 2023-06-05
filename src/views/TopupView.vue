<script lang="ts">
import TopupControl from "../configs/components/TopupControl.vue";
import TopupHistoryControl from "../configs/components/TopupHistoryControl.vue";
export default {
  components: { TopupControl, TopupHistoryControl },
  data: () => ({
    currentTab: null,
    tabs: [
      { value: "topup", label: "เติมเงิน" },
      { value: "topupHistory", label: "ประวัติการเติมเงิน" },
    ],
  }),
};
</script>
<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :variants="{ custom: { scale: 1.1 } }"
    :delay="200"
  >
    <v-card>
      <v-tabs v-model="currentTab" class="!bg-primary text-primary-content">
        <v-tab v-for="tab in tabs" :value="tab.value">{{ tab.label }}</v-tab>
      </v-tabs>
      <v-card-text class="bg-base-300 text-base-content">
        <v-window v-model="currentTab">
          <v-window-item value="topup">
            <TopupControl></TopupControl>
          </v-window-item>
          <v-window-item value="topupHistory">
            <TopupHistoryControl></TopupHistoryControl>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss"></style>
