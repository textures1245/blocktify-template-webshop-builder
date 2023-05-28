<script lang="ts">
import { PropType, ref } from "vue";
import { usePlayerStore } from "../store/actor/playerStore";
import BadgeWidget from "../widgets/BadgeWidget.vue";
export default {
  components: { BadgeWidget },
  props: {
    bgImg: {
      type: Object as PropType<{
        isCustom: boolean;
        src: string;
      }>,
      required: true,
    },
  },
  setup() {
    return {
      player: usePlayerStore().getCurrentPlayer,
    };
  },
  data() {
    return {
      isAuth: ref(false),
    };
  },
};
</script>
<template>
  <section id="player-badge">
    <!-- <div id="player-login" v-if="isAuth"></div> -->
    <div v-if="player" class="grid">
      <BadgeWidget
        :avatar-src="player.avatar"
        :title="player.playerName"
        :subtitle="`ยอดเงินคงเหลือ: ${player.transaction.wallet}`"
        :bgImg="bgImg.isCustom ? bgImg.src : ''"
        axis="horizontal"
        text-color-custom="!text-slate-800 "
      ></BadgeWidget>
    </div>
  </section>
</template>
<style lang="scss"></style>
