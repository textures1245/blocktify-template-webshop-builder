<script lang="ts">
import draggable from "vuedraggable";
import DonateListWidget from "../widgets/DonateListWidget.vue";
import PlayerBadge from "../components/PlayerBadge.vue";
import AlertSlideMsgWidget from "../widgets/AlertSlideMsgWidget.vue";
import BoardNews from "../widgets/BoardNews.vue";
import ProductCollectionWidget from "../widgets/ProductCollectionGrid.vue";
import CardLink from "../components/CardLink.vue";
import { useConfigComponentStore } from "../configs/configCPNStore";
import { MainComponent } from "../configs/configCSS";
import { ref } from "vue";

export default {
  components: {
    draggable,
    DonateListWidget,
    PlayerBadge,
    BoardNews,
    AlertSlideMsgWidget,
    ProductCollectionWidget,
    CardLink,
  },

  setup() {
    const store = useConfigComponentStore();
    return {
      config: store.getMainBodyConfig,
      components: ref(store.getInitializedContents()),
    };
  },

  data() {
    return {
      tempComponents: <MainComponent[]>[],
    };
  },
  mounted() {},
};
</script>
<template>
  <draggable
    :list="components"
    :group="{ group: { name: 'people' } }"
    itemKey="id"
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 self-center"
  >
    <template #item="{ element, index }">
      <div
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :variants="{ custom: { scale: 1.1 } }"
        :hovered="{ scale: 1.05 }"
        :delay="200"
        :class="element.area"
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
