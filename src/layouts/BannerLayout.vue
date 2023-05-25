<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
import BadgeWidget from "../widgets/BadgeWidget.vue";
import HeroContent from "../widgets/HeroContent.vue";

export default {
  components: { BadgeWidget, HeroContent },
  setup() {
    return { config: useConfigComponentStore().getBannerConfig };
  },
};
</script>
<template>
  <v-parallax
    class="w-full !h-[50vh] !absolute"
    :src="config.background.value"
  ></v-parallax>
  <section id="main-content" class="relative !h-[50vh] min-w-full shadow-2xl">
    <div class="flex h-full justify-center items-center">
      <div
        class="items-center place-items-center grid gap-x-10 xl:gap-x-28 gap-y-4 grid-cols-2 lg:grid-cols-3"
      >
        <div class="col-span-1">
          <BadgeWidget
            :avatar-src="config.contents.widgetOne.iconSrc"
            :axis="config.contents.widgetOne.axis"
            :title="config.contents.widgetOne.title"
            :subtitle="config.contents.widgetOne.subtitle"
          ></BadgeWidget>
        </div>
        <div class="grid items-center row-span-2 lg:row-span-1">
          <HeroContent
            :show-logo="config.contents.bannerText.isShowLogo"
            :subtitle="config.contents.bannerText.subtitle"
            :title="config.contents.bannerText.title"
          ></HeroContent>
        </div>
        <div class="col-span-1">
          <BadgeWidget
            :avatar-src="config.contents.widgetTwo.iconSrc"
            :title="config.contents.widgetTwo.title"
            :subtitle="config.contents.widgetTwo.subtitle"
            :axis="config.contents.widgetTwo.axis"
          ></BadgeWidget>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss"></style>
