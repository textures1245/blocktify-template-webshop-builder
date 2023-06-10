<script lang="ts">
import { PropType } from "vue";
import { useConfigComponentStore } from "../configs/configCPNStore";

export default {
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
          return "!bg-[#5964F2] text-white";
      }
    },
  },
};
</script>
<template>
  <v-footer
    v-if="!config.bg.isImage"
    color="transparent"
    :class="[`drop-shadow-lg z-[1000] h-auto w-screen bg-cover p-0`]"
  >
    <div
      id="footer-grid"
      class="backdrop-blur-md w-full mix-blend-difference bg-gradient-to-b from-secondary-focus to-secondary grid p-6 py-20 gap-3 overflow-auto md:grid-cols-5 place-self-center"
    >
      <div class="md:col-span-4">
        <article class="prose-sm text-secondary-content">
          <h1 class="underline underline-offset-8 font-extrabold">
            {{ `เกี่ยวกับ ${globalConfig.websiteName}` }}
          </h1>
          <blockquote class="font-bold">
            {{ config.webInfo.aboutContent }}
          </blockquote>
        </article>
      </div>
      <div
        class="col-span-1 place-self-center"
        v-if="config.followProps && config.followProps.requires.length > 0"
      >
        <article class="prose-sm text-secondary-content">
          <h2 class="underline font-bold underline-offset-8 text-center">
            ติดตามเราได้ที่
          </h2>
          <div class="flex justify-center flex-wrap gap-3 pt-3">
            <v-btn
              size="small"
              :class="['text-sm md:text-base', actionBgColor(btn.action)]"
              v-for="btn in config.followProps.requires"
              :icon="
                btn.action !== 'discord' ? `mdi-${btn.action}` : 'mdi-alpha-d'
              "
              :href="btn.linkUrl"
            ></v-btn>
          </div>
          <p class="text-sm relative font-bold -bottom-5 text-center">
            © Blocktify - 2023
          </p>
        </article>
      </div>
    </div>
  </v-footer>
  <v-footer
    v-else
    :style="{
      backgroundImage: `url(${config.bg.src})`,
    }"
    color="transparent"
    :class="[`drop-shadow-lg h-auto w-screen bg-cover p-0 `]"
  >
    <div
      id="footer-grid"
      class="backdrop-blur-md w-full grid p-6 py-12 gap-3 overflow-auto md:grid-cols-5 place-self-center"
    >
      <div class="md:col-span-4">
        <article class="prose-sm mix-blend-difference">
          <h1
            class="!text-primary-focus underline underline-offset-8 font-extrabold"
          >
            {{ `เกี่ยวกับ ${globalConfig.websiteName}` }}
          </h1>
          <blockquote class="font-bold">
            {{ config.webInfo.aboutContent }}
          </blockquote>
        </article>
      </div>
      <div
        class="col-span-1 place-self-center"
        v-if="config.followProps && config.followProps.requires.length > 0"
      >
        <article class="prose-sm">
          <h2 class="underline font-bold underline-offset-8 text-center">
            ติดตามเราได้ที่
          </h2>
          <div class="flex justify-center flex-wrap gap-3 pt-3">
            <v-btn
              size="small"
              :class="['text-sm md:text-base', actionBgColor(btn.action)]"
              v-for="btn in config.followProps.requires"
              :icon="
                btn.action !== 'discord' ? `mdi-${btn.action}` : 'mdi-alpha-d'
              "
              :href="btn.linkUrl"
            ></v-btn>
          </div>
          <p class="text-sm relative font-bold -bottom-5 text-center">
            © Blocktify - 2023
          </p>
        </article>
      </div>
    </div>
  </v-footer>
</template>
<style lang="scss"></style>
