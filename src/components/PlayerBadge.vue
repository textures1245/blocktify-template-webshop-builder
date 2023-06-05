<script lang="ts">
import { PropType, ref } from "vue";
import { usePlayerStore } from "../store/actor/playerStore";
import BadgeWidget from "../widgets/BadgeWidget.vue";
export default {
  components: { BadgeWidget },
  props: {
    avatarImage: {
      type: String,
      required: true,
    },
    onPreview: {
      type: Boolean,
      default: false,
    },
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
    <div v-if="player || onPreview" class="grid">
      <BadgeWidget
        :avatar-src="avatarImage"
        :title="player?.playerName || 'Player Name'"
        :subtitle="
          player?.transaction.wallet
            ? `ยอดเงินคงเหลือ: ${player.transaction.wallet}`
            : 'ยอดเงินคงเหลือ 999'
        "
        :bgImg="bgImg.isCustom ? bgImg.src : ''"
        axis="horizontal"
      ></BadgeWidget>
    </div>
  </section>
</template>
<style lang="scss"></style>
