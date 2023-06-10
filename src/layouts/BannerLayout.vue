<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import BadgeWidget from "../widgets/BadgeWidget.vue";
import HeroContent from "../widgets/HeroContent.vue";
import ParticleSet from "../components/ParticleSet.vue";

export default {
  components: { BadgeWidget, HeroContent, ParticleSet },
  setup() {
    return { config: useConfigComponentStore().getBannerConfig };
  },
};
</script>
<template>
  <div class="">
    <ParticleSet
      :preset-opt="config.particle.preset"
      :fullscreen="config.particle.fullscreen"
    ></ParticleSet>
    <v-parallax
      :class="['w-full !h-[75vh]  !absolute', `opacity-${config.background.opacity!}`]"
      :src="config.background.value"
    ></v-parallax>
    <section id="main-content" class="relative !h-[75vh] w-full shadow-2xl">
      <div
        class="flex justify-center flex-col lg:flex-row items-center w-full h-full gap-10"
      >
        <div
          v-if="config.contents.required.includes('widgetOne')"
          class="col-span-1"
        >
          <BadgeWidget
            :avatar-src="config.contents.widgetOne.iconSrc"
            :axis="config.contents.widgetOne.axis"
            :title="config.contents.widgetOne.title"
            :subtitle="config.contents.widgetOne.subtitle"
          ></BadgeWidget>
        </div>
        <div class="grid px-10 items-center row-span-2 lg:row-span-1 order-0">
          <HeroContent
            :show-logo="config.contents.bannerText.isShowLogo"
            :subtitle="config.contents.bannerText.subtitle"
            :title="config.contents.bannerText.title"
          ></HeroContent>
        </div>
        <div
          v-if="config.contents.required.includes('widgetTwo')"
          class="col-span-1"
        >
          <BadgeWidget
            :avatar-src="config.contents.widgetTwo.iconSrc"
            :title="config.contents.widgetTwo.title"
            :subtitle="config.contents.widgetTwo.subtitle"
            :axis="config.contents.widgetTwo.axis"
          ></BadgeWidget>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss"></style>
