<script lang="ts">
import { useConfigComponentStore, useHelpConfigStore } from "../configCPNStore";
import CardExpand from "../../components/CardExpand.vue";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import BadgeWidget from "../../widgets/BadgeWidget.vue";
import HeroContent from "../../widgets/HeroContent.vue";
export default {
  components: { CardExpand, CardExpandPanel, BadgeWidget, HeroContent },
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
      <FormKit
        type="select"
        label="เลือกชนิดพื้นหลัง"
        v-model="config.background.selected"
        name="banner-bg"
        :options="configOpts.bannerBgOpts"
        placeholder="Select a Banner Background Image."
        validation="required"
      ></FormKit>
      <div v-if="config.background.selected !== 'none'">
        <FormKit
          type="file"
          label="เลือก File"
          name="banner-bg"
          placeholder="Select a Banner Background Opacity."
          validation="required"
        ></FormKit>
        <FormKit
          type="range"
          min="0"
          step="10"
          max="100"
          validation-visibility="live"
          label="ปรับระดับความใส"
          name="banner-bg-opacity"
          placeholder="Adjust opacity."
          validation="required"
        ></FormKit>
      </div>
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
        <FormKit
          type="file"
          label="เลือกรูปภาพที่ต้องการใส่ในกรอบไอคอน"
          name="widget-one-logo"
          validation="required"
          help=""
        ></FormKit>
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
          :help="helpConfig.lengthLabel(8)"
          validation="required|length:0,8"
        ></FormKit>
        <FormKit
          type="text"
          validation-visibility="live"
          label="ข้อความ Subtitle"
          name="widget-one-subtile"
          v-model="config.contents.widgetOne.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          :help="helpConfig.lengthLabel(16)"
          validation="required|length:0,16"
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
        <FormKit
          type="file"
          label="เลือกรูปภาพที่ต้องการใส่ในกรอบไอคอน"
          name="widget-two-logo"
          validation="required"
        ></FormKit>
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
          :help="helpConfig.lengthLabel(8)"
          validation="required|length:0,8"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Subtitle"
          validation-visibility="live"
          name="widget-two-subtile"
          v-model="config.contents.widgetTwo.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          validation="required|length:0,14"
          :help="helpConfig.lengthLabel(14)"
        ></FormKit>
      </template>
    </CardExpandPanel>
    <CardExpandPanel
      v-if="config.contents.required.includes('bannerText')"
      :item-preview="true"
      title="ข้อความของแบนเนอร์"
    >
      <template #item-preview>
        <HeroContent
          :title="config.contents.bannerText.title"
          :subtitle="config.contents.bannerText.subtitle"
          :show-logo="config.contents.bannerText.isShowLogo"
        ></HeroContent>
      </template>
      <template #content>
        <FormKit
          type="file"
          label="เลือกรูปภาพที่ต้องการใส่ในกรอบไอคอน"
          name="banner-logo"
          validation="required"
          help=""
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Title"
          name="banner-text-title"
          v-model="config.contents.bannerText.title"
          placeholder="โปรดกรอกข้อมูล"
          :help="helpConfig.lengthLabel(8)"
          validation-visibility="live"
          validation="required|length:0,8"
        ></FormKit>
        <FormKit
          type="text"
          label="ข้อความ Subtitle"
          name="banner-text-subtile"
          v-model="config.contents.bannerText.subtitle"
          placeholder="โปรดกรอกข้อมูล"
          validation-visibility="live"
          validation="required|length:0,10"
          :help="helpConfig.lengthLabel(10)"
        ></FormKit>
      </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style lang="scss"></style>
