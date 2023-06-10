<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import BadgeWidget from "../widgets/BadgeWidget.vue";
import HeroContent from "../widgets/HeroContent.vue";
import ParticleSet from "../components/ParticleSet.vue";
import CurveCanvasModifier from "../components/CurveCanvasModifier.vue";

export default {
  components: { BadgeWidget, HeroContent, ParticleSet, CurveCanvasModifier },
  setup() {
    return { config: useConfigComponentStore().getBannerConfig };
  },
};
</script>
<template>
  <ParticleSet
    :preset-opt="config.particle.preset"
    :fullscreen="config.particle.fullscreen"
  ></ParticleSet>
  <v-parallax
    v-if="config.background.selected === 'img'"
    :class="['w-full !h-[48rem]  !absolute', `opacity-${config.background.opacity!}`]"
    :src="config.background.value"
  ></v-parallax>
  <figure v-else class="video-container !h-[48rem] absolute w-full">
    <video
      loop
      muted
      autoplay
      :class="['h-full w-full object-cover', `opacity-${config.background.opacity!}`]  "
      :src="config.background.value"
    ></video>
  </figure>

  <section id="main-content" class="relative !h-[48rem] w-full">
    <CurveCanvasModifier :curveType="config.curve"></CurveCanvasModifier>
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
</template>
<style scoped lang="scss">
figure {
  margin: 0;
  position: relative;
  background-color: transparent;
  overflow: hidden;
  background: radial-gradient(transparent, hsl(var(--sf, var(--s))));
}
</style>
