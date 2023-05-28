<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import { usePlayerStore } from "../store/actor/playerStore";
export default {
  setup() {
    return {
      player: usePlayerStore().getCurrentPlayer!,
      globalConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot name="activator"> </slot>
      </div>
    </template>

    <v-card
      :data-theme="globalConfig.themeColor"
      class="!w-auto bg-gradient-to-t from-base-100 to-primary bg- px-10 md:!w-[600px]"
    >
      <v-card-text class="bg-gradient-to-b from-base-200 rounded-md mt-10">
        <div class="grid gap-10 grid-cols-2 py-10">
          <div class="flex flex-col justify-center items-center">
            <div class="avatar mb-10">
              <div class="w-32 mask mask-squircle">
                <img :src="player.avatar" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <v-chip class="!btn-primary">
                {{ `ชื่อผู้เล่น: ${player.playerName}` }}
              </v-chip>
              <v-chip class="!btn-secondary">{{
                `ยอดเงินคงเหลือ: ${player.transaction.wallet}`
              }}</v-chip>
            </div>
          </div>
          <div class="flex items-center gap-5 flex-col">
            <div class="stats stats-vertical shadow">
              <div class="stat">
                <div class="stat-title">เติมเงินล่าสุดเมื่อ</div>
                <div class="stat-value text-sm">
                  {{ player.transaction.recentTopUpDate?.toLocaleString() }}
                </div>
              </div>

              <div class="stat">
                <div class="stat-title">จำนวนที่เติม</div>
                <div class="stat-value text-sm">
                  {{ player.transaction.recentTopUp }}
                </div>
              </div>

              <div class="stat">
                <div class="stat-title">จำนวนเติมทั้งหมด</div>
                <div class="stat-value text-sm">
                  {{ player.transaction.topUpTotal }}
                </div>
              </div>
            </div>
            <v-chip @click="dialog = false" to="/app/topup" class="!btn-accent"
              ><span class="flex justify-center w-full">
                ดูประวัติการเติมเงินทั้งหมด</span
              ></v-chip
            >
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="!text-error" block>ออกจากระบบ</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn
      @click="dialog = false"
      class="absolute !btn-error -right-4 -top-6"
      icon="mdi-close"
    ></v-btn>
  </v-dialog>
</template>
<style lang="scss"></style>
