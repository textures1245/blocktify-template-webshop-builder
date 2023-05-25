<script lang="ts">
import { PropType } from "vue";
import { FollowProps, WebInfo } from "../configs/configCSS";
import { useConfigComponentStore } from "../configs/configCPNStore";
export default {
  props: {
    background: String,
  },
  setup() {
    return {
      config: useConfigComponentStore().getFooterConfig,
      globalConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
  methods: {
    actionBgColor(action: "youtube" | "facebook" | "twitter" | "discord") {
      switch (action) {
        case "youtube":
          return "!bg-red-600  text-white";
        case "facebook":
          return "!bg-[#12A5fa] text-white";
        case "twitter":
          return "!bg-[#1d98f0] text-white";
        default:
          return "";
      }
    },
  },

  computed: {
    bg() {
      return "from-" + this.background!;
    },
  },
};
</script>
<template>
  <v-footer
    color="transparent"
    :class="[`h-auto bg-gradient-to-b to-gray-300 !from-${background}`]"
  >
    <div
      id="footer-grid"
      class="container mx-auto w-full  grid py-6 gap-3 overflow-auto md:grid-cols-5 place-self-center"
    >
      <div class="md:col-span-4">
        <article class="prose-sm">
          <h1
            class="!text-primary-focus underline underline-offset-8 font-bold"
          >
            {{ `เกี่ยวกับ ${globalConfig.websiteName}` }}
          </h1>
          <blockquote class="">{{ config.webInfo.aboutContent }}</blockquote>
        </article>
      </div>
      <div
        class="col-span-1 justify-self-center"
        v-if="config.followProps && config.followProps.requires.length > 0"
      >
        <article class="prose-sm">
          <h2 class="underline underline-offset-8 text-center">
            ติดตามเราได้ที่
          </h2>
          <div class="flex gap-3">
            <v-btn
              size="small"
              :class="['text-sm md:text-base', actionBgColor(btn.action)]"
              v-for="btn in config.followProps.requires"
              :icon="`mdi-${btn.action}`"
              :href="btn.linkUrl"
            ></v-btn>
          </div>
          <p class="text-sm relative -bottom-5 text-center">
            © Blocktify - 2023
          </p>
        </article>
      </div>
    </div>
  </v-footer>
</template>
<style lang="scss"></style>
