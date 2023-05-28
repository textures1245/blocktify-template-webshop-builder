<script lang="ts">
import { useConfigComponentStore, useHelpConfigStore } from "../configCPNStore";
import CardExpand from "../../components/CardExpand.vue";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import BadgeWidget from "../../widgets/BadgeWidget.vue";
import FileControl from "../components/FileControl.vue";
import HeroContent from "../../widgets/HeroContent.vue";
export default {
  components: {
    CardExpand,
    CardExpandPanel,
    BadgeWidget,
    HeroContent,
    FileControl,
  },
  setup() {
    const configStore = useConfigComponentStore();
    return {
      config: configStore.getBannerConfig,
      helpConfig: useHelpConfigStore(),
    };
  },
  data() {
    return {
      configOpts: {
        bannerBgOpts: ["color", "img", "video", "none"],
        componentOpts: ["widgetOne", "widgetTwo", "bannerText"],
        axisOpts: ["vertical", "horizontal"],
      },
    };
  },
};
</script>
<template>
  <CardExpand headline="พื้นหลังแบนเนอร์ (Banner Background)">
    <template #content>
      <FileControl
        @file-emitter="(imageUrl: string) => (config.background.value = imageUrl)"
        action="image"
        :storage="config.background.value!"
      ></FileControl>
    </template>
  </CardExpand>

  <CardExpand headline="คอนเทนต์ตรงกลาง (Banner Content)">
    <template #content>
      <FormKit
        type="checkbox"
        label="คอนเทนต์ที่คุณต้องการโชว์"
        name="banner-bg-opacity"
        v-model="config.contents.required"
        :options="configOpts.componentOpts"
        placeholder="Adjust opacity."
      ></FormKit>
    </template>
  </CardExpand>
  <v-expansion-panels
    v-if="config.contents.required.length > 0"
    :multiple="true"
  >
    <CardExpandPanel
      v-if="config.contents.required.includes('widgetOne')"
      :item-preview="true"
      title="Widget 1"
    >
      <template #item-preview>
        <BadgeWidget
          :avatar-src="config.contents.widgetOne.iconSrc"
          :axis="config.contents.widgetOne.axis"
          :title="config.contents.widgetOne.title"
          :subtitle="config.contents.widgetOne.subtitle"
        ></BadgeWidget>
      </template>
      <template #content>
        <FileControl
          @file-emitter="(imageUrl: string) => (config.contents.widgetOne.iconSrc = imageUrl)"
          action="image"
          :storage="config.contents.widgetOne.iconSrc!"
        ></FileControl>
        <FormKit
          v-model="config.contents.widgetOne.axis"
          type="select"
          label="เลือกแนวที่ต้องการจัดเรียง"
          name="widget-one-axis"
          validation="required"
          :options="configOpts.axisOpts"
        ></FormKit>
        <FormKit
          validation-visibility="live"
          type="text"
          label="ข้อความ Title"
          name="widget-one-title"
          v-model="config.contents.widgetOne.title"
          placeholder="โปรดกรอกข้อมูล"
          validation="required"
        ></FormKit>
        <FormKit
          type="text"
          validation-visibility="live"
          label="ข้อความ Subtitle"
          name="widget-one-subtile"
          v-model="config.contents.widgetOne.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          validation="required"
        ></FormKit>
      </template>
    </CardExpandPanel>
    <CardExpandPanel
      v-if="config.contents.required.includes('widgetTwo')"
      :item-preview="true"
      title="Widget 2"
    >
      <template #item-preview>
        <BadgeWidget
          :avatar-src="config.contents.widgetTwo.iconSrc"
          :axis="config.contents.widgetTwo.axis"
          :title="config.contents.widgetTwo.title"
          :subtitle="config.contents.widgetTwo.subtitle"
        ></BadgeWidget>
      </template>
      <template #content>
        <FileControl
          @file-emitter="(imageUrl: string) => (config.contents.widgetTwo.iconSrc = imageUrl)"
          action="image"
          :storage="config.contents.widgetTwo.iconSrc!"
        ></FileControl>
        <FormKit
          v-model="config.contents.widgetTwo.axis"
          type="select"
          label="เลือกแนวที่ต้องการจัดเรียง"
          name="widget-two-axis"
          validation="required"
          :options="configOpts.axisOpts"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Title"
          validation-visibility="live"
          name="widget-two-title"
          v-model="config.contents.widgetTwo.title"
          placeholder="โปรดกรอกข้อมูล"
          validation="required"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Subtitle"
          validation-visibility="live"
          name="widget-two-subtile"
          v-model="config.contents.widgetTwo.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          validation="required"
        ></FormKit>
      </template>
    </CardExpandPanel>
    <CardExpandPanel
      v-if="config.contents.required.includes('bannerText')"
      :item-preview="true"
      title="ข้อความของแบนเนอร์"
    >
      <template #item-preview>
        <v-card class="p-5 bg-gray-700">
          <v-card-text>
            <HeroContent
              :title="config.contents.bannerText.title"
              :subtitle="config.contents.bannerText.subtitle"
              :show-logo="config.contents.bannerText.isShowLogo"
            ></HeroContent>
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <FormKit
          label="แสดงโลโก้"
          type="checkbox"
          v-model="config.contents.bannerText.isShowLogo"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Title"
          name="banner-text-title"
          v-model="config.contents.bannerText.title"
          placeholder="โปรดกรอกข้อมูล"
          :help="helpConfig.lengthLabel(15)"
          validation-visibility="live"
          validation="required|length:0,15"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Subtitle"
          name="banner-text-subtile"
          v-model="config.contents.bannerText.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          validation-visibility="live"
        ></FormKit>
      </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style lang="scss"></style>
