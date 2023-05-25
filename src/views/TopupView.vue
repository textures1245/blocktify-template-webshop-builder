<script lang="ts">
import TopupControl from "../configs/components/TopupControl.vue";
import TopupHistoryControl from "../configs/components/TopupHistoryControl.vue";
import { useTransactionStore } from "../store/product/transationStore";
export default {
  components: { TopupControl, TopupHistoryControl },
  data: () => ({
    currentTab: null,
    tabs: [
      { value: "topup", label: "เติมเงิน" },
      { value: "topupHistory", label: "ประวัติการเติมเงิน" },
    ],
  }),

  async mounted() {
    await useTransactionStore().onFetchTopUpTransactionList();
  },
};
</script>
<template>
  <v-card>
    <v-tabs v-model="currentTab" class="!bg-primary text-primary-content">
      <v-tab v-for="tab in tabs" :value="tab.value">{{ tab.label }}</v-tab>
    </v-tabs>
    <v-card-text>
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
</template>
<style lang="scss"></style>
