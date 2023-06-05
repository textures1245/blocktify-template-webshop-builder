<script lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import {
  useTransactionStore,
  TopUpTransaction,
} from "../../store/product/transationStore";

import IconAnimation from "../../components/IconAnimation.vue";

export default {
  components: { VDataTable, IconAnimation },
  setup() {
    return {
      transactionStore: useTransactionStore(),
    };
  },

  mounted() {
    this.history = this.transactionStore.getTopUpTransactionList.map(
      (transaction) => {
        return {
          ...transaction,
          created: transaction.created.toLocaleDateString("en-US") as any,
        };
      }
    );
  },

  data() {
    return {
      loadedIcon: false,
      topUpMethodQuery: "",
      headers: [
        {
          align: "start",
          key: "method",
          sortable: false,
          title: "ประเภทเติมเงิน",
        },
        { key: "amount", title: "ยอดเติม" },
        { key: "created", title: "วันที่" },
      ] as any[],
      history: <TopUpTransaction[]>[],
    };
  },
};
</script>
<template>
  <v-card v-if="history.length > 0" class="bg-base-300 text-base-content">
    <v-card-title>
      ประเภทการเติมเงิน
      <v-spacer></v-spacer>
      <v-select
        placeholder="ทั้งหมด"
        v-model="topUpMethodQuery"
        label="Select"
        single-line
        hide-details
        append-icon="mdi-cash-fast"
        :items="['TRUE_WALLET']"
      ></v-select>
    </v-card-title>
    <v-data-table
      class="bg-base-300 text-base-content"
      :headers="headers"
      :items="history"
      :search="topUpMethodQuery"
    ></v-data-table>
  </v-card>
  <IconAnimation
    v-else
    v-show="loadedIcon"
    @loaded-script="(loaded: boolean) => loadedIcon = loaded"
    title="คุณยังไม่มีประวัติเติมเงินในขณะนี้"
  >
    <template #icon>
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_GXS1DssMnR.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
    </template>
  </IconAnimation>
</template>
<style lang="scss"></style>
