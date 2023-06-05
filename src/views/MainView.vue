<script lang="ts">
import draggable from "vuedraggable";
import DonateListWidget from "../widgets/DonateListWidget.vue";
import PlayerBadge from "../components/PlayerBadge.vue";
import AlertSlideMsgWidget from "../widgets/AlertSlideMsgWidget.vue";
import BoardNews from "../widgets/BoardNews.vue";
import ProductCollectionWidget from "../widgets/ProductCollectionGrid.vue";
import CardLink from "../components/CardLink.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { loadScript } from "vue-plugin-load-script";
import { storeToRefs } from "pinia";
import IconAnimation from "../components/IconAnimation.vue";
import { useClientStore } from "../auth/store/authClientStore";
import YouTubeIFrame from "../components/YouTubeIFrame.vue";

export default {
  components: {
    draggable,
    DonateListWidget,
    PlayerBadge,
    BoardNews,
    AlertSlideMsgWidget,
    ProductCollectionWidget,
    CardLink,
    IconAnimation,
    YouTubeIFrame,
  },

  setup() {
    const store = useConfigComponentStore();

    let { storageContents } = storeToRefs(store).getMainBodyConfig.value;
    return {
      config: store.getMainBodyConfig,
      storageContents,
      onClientView: useClientStore().getIsClientAuth,
    };
  },

  computed: {
    loadedScript() {
      if (this.storageContents.length < 1) {
        return loadScript(import.meta.env.VITE_LOTTIE_API).then(() => true);
      }
    },
  },

  watch: {
    storageContents() {
      this.storageContents = this.storageContents;
    },
  },

  data() {
    return {};
  },
};
</script>
<template>
  <div
    class="grid w-full h-full place-content-center"
    v-if="storageContents.length < 1 && loadedScript"
  >
    <IconAnimation
      title="Componnent ว่างอยู่"
      subtitle="ลองเข้าไปแก้ไขส่วนของ แก้ไข้เว็บไซต์ -> Main Content เพื่อจัดการส่วนของ Components ดูสิ"
    >
      <template #icon>
        <lottie-player
          src="https://assets1.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player> </template
    ></IconAnimation>
  </div>
  <draggable
    :disabled="!onClientView"
    v-else
    :list="storageContents"
    :group="{ group: { name: 'people' } }"
    itemKey="id"
    class="grid sm:grid-cols-1 lg:grid-cols-3 gap-5"
  >
    <template #item="{ element, index }">
      <div
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :variants="{ custom: { scale: 1.1 } }"
        :hovered="{ scale: 1.05 }"
        :delay="200"
        :class="[element.area]"
      >
        <component
          :is="element.type"
          :props="element.props || null"
        ></component>
      </div>
    </template>
  </draggable>
</template>
<style lang="scss">
.parent {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 5;
}
.div2 {
  grid-area: 2 / 1 / 3 / 4;
}
.div3 {
  grid-area: 3 / 1 / 4 / 2;
}
.div4 {
  grid-area: 3 / 2 / 4 / 3;
}
.div5 {
  grid-area: 3 / 3 / 4 / 4;
}
</style>
