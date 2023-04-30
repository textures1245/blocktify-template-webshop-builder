<script lang="ts">
import { PropType } from "vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { text } from "stream/consumers";
export default {
  props: {
    avatarSrc: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: String,
    axis: {
      type: String as PropType<"vertical" | "horizontal">,
      required: true,
    },
    customContent: Boolean,
    bgCustom: String,
    bgImg: String,
    textColorCustom: String,
    burrBg: Boolean,
  },
  setup() {
    return {
      globalConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
  computed: {
    axisCss() {
      return this.axis === "horizontal"
        ? "flex justify-center items-center h-28"
        : "";
    },
  },
};
</script>
<template>
  <div
    :style="bgImg ? { backgroundImage: 'url(' + bgImg + ') !important' } : ''"
    :class="[
      !bgCustom && !bgImg ? 'bg-accent' : bgCustom,

      ' w-56 h-28 !card bg-cover ',
      'rounded-md',
    ]"
  >
    <section
      id="static-content"
      v-if="!customContent"
      :class="[axisCss, burrBg ? 'backdrop-blur-sm' : '']"
    >
      <div v-if="avatarSrc" id="avatar-section" class="flex justify-center">
        <div class="!bg-gray-300 rounded avatar relative -top-2 shadow-md">
          <figure class="rounded w-full p-1">
            <v-img
              cover
              sizes="32"
              class="!w-9"
              alt="avatar-image"
              :src="avatarSrc"
            />
          </figure>
        </div>
      </div>
      <v-card-item
        :class="[
          !textColorCustom ? '!text-accent-content' : textColorCustom,
          'text-center ',
        ]"
      >
        <h1 class="font-bold">{{ title || "title" }}</h1>
        <p class="break-words text-sm">{{ subtitle || "" }}</p>
      </v-card-item>
    </section>
    <section v-else>
      <slot name="content"></slot>
    </section>
  </div>
</template>
<style lang="scss">
.bg {
  background-image: url("../assets/images/playerr-badge-bg-2.jpg");
}
</style>
