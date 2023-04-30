<script lang="ts">
import { PropType, ref } from "vue";
import BadgeWidget from "../widgets/BadgeWidget.vue";
export default {
  components: { BadgeWidget },
  props: {
    bgImg: {
      type: Object as PropType<{
        isCustom: Boolean;
        src: String;
      }>,
      required: true,
    },
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
    <div id="player-login" v-if="isAuth"></div>
    <BadgeWidget
      avatar-src="https://minotar.net/helm/mhf_steve/600.png"
      title="PlayerName"
      subtitle="Yeet"
      :bg-img="bgImg?.isCustom ? bgImg?.src : ''"
      axis="horizontal"
      text-color-custom="!text-slate-800 "
      v-else
    ></BadgeWidget>
  </section>
</template>
<style lang="scss"></style>
