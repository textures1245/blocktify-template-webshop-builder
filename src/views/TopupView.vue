<script lang="ts">
import TopupControl from "../components/TopupControl.vue";
export default {
  components: { TopupControl },
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
  <v-card>
    <v-tabs v-model="currentTab" class="!bg-primary text-primary-content">
      <v-tab v-for="tab in tabs" :value="tab.value">{{ tab.label }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="currentTab">
        <v-window-item value="topup">
          <TopupControl></TopupControl>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<style lang=""></style>
