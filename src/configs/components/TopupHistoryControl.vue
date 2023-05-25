<script lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import {
  useTransactionStore,
  TopUpTransaction,
} from "../../store/product/transationStore";

export default {
  components: { VDataTable },
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
  <v-card>
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
      :headers="headers"
      :items="history"
      :search="topUpMethodQuery"
    ></v-data-table>
  </v-card>
</template>
<style lang="scss"></style>
