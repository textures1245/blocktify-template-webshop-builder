<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import PlayerBadge from "../../components/PlayerBadge.vue";
import FileControl from "../components/FileControl.vue";
import { useConfigComponentStore } from "../configCPNStore";
export default {
  components: { CardExpand, CardExpandPanel, PlayerBadge, FileControl },
  setup() {
    return { config: useConfigComponentStore().getSidebarConfig };
  },
  data() {
    return {
      configOpts: {
        widgetSelectedOpts: {
          playerBadge: "ป้ายผุ้เล่น",
          topDonate: "อันดับการเติมเงินสูงสุด",
          recentDonate: "อันดับการเติมเงินล่าสุด",
        },
        widgetConfigs: {
          playerBadge: {},
        },
      },
    };
  },
};
</script>
<template>
  <CardExpand headline="คอนเทนต์ตรงกลาง (Banner Content)">
    <template #content>
      <FormKit
        type="checkbox"
        label="คอนเทนต์ที่คุณต้องการโชว์"
        name="banner-bg-opacity"
        v-model="config.contents.required"
        :options="configOpts.widgetSelectedOpts"
        placeholder="Adjust opacity."
      ></FormKit>
    </template>
  </CardExpand>
  <v-expansion-panels
    v-if="config.contents.required.length > 0"
    :multiple="true"
  >
    <CardExpandPanel
      v-if="config.contents.required.includes('playerBadge')"
      :item-preview="true"
      title="ป้ายผู้เล่น (Player Badge)"
    >
      <template #item-preview>
        <PlayerBadge
          v-if="config.contents.required.includes('playerBadge')"
          :bgImg="{
            isCustom: config.contents.playerBadge.bg.custom,
            src: config.contents.playerBadge.bg.src!,
          }"
        ></PlayerBadge>
      </template>
      <template #content>
        <section id="bg-custom-img">
          <FormKit
            v-model="config.contents.playerBadge.bg.custom"
            type="checkbox"
            label="เลือกรูปภาพที่ต้องการใส่บนพื้นหลัง"
            name="widget-one-axis"
            validation="required"
          ></FormKit>
          <FileControl
            :storage="config.contents.playerBadge.bg.src!"
            v-if="config.contents.playerBadge.bg.custom"
            action="image"
          ></FileControl>
        </section>
      </template>
    </CardExpandPanel>
    <CardExpandPanel
      v-if="config.contents.required.includes('recentDonate')"
      :item-preview="false"
      title="อันดับการเติมเงินล่าสุด (Recent recharge rank)"
    >
      <template #content>
        <FormKit
          v-model="config.contents.recentDonate.limit"
          type="number"
          label="เลือกจำนวนรายการที่ต้องการโชว์"
          name="widget-one-axis"
          help="สูงสุด 10 รายการ"
          validation="required|max:10"
        ></FormKit>
      </template>
    </CardExpandPanel>
    <CardExpandPanel
      v-if="config.contents.required.includes('topDonate')"
      :item-preview="false"
      title="อันดับการเติมเงินสูงสุด (Highest recharge rank)"
    >
      <template #content>
        <FormKit
          v-model="config.contents.topDonate.limit"
          type="number"
          label="เลือกจำนวนรายการที่ต้องการโชว์"
          name="widget-one-axis"
          help="สูงสุด 10 รายการ"
          validation="required|max:10"
        ></FormKit>
      </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style lang="scss"></style>
