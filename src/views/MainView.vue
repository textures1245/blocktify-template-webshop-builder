<script lang="ts">
import draggable from "vuedraggable";
import DonateListWidget from "../widgets/DonateListWidget.vue";
import PlayerBadge from "../components/PlayerBadge.vue";
import AlertSlideMsgWidget from "../widgets/AlertSlideMsgWidget.vue";
import BoardNews from "../widgets/BoardNews.vue";
import ProductCollectionWidget from "../widgets/ProductCollectionGrid.vue";
import CardLink from "../components/CardLink.vue";

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

  data() {
    return {
      components: [
        {
          id: 1,
          type: "AlertSlideMsgWidget",
          props: {},
          area: "col-span-full",
        },
        { id: 2, type: "BoardNews", props: {}, area: "col-span-full" },
        {
          id: 3,
          type: "PlayerBadge",
          props: {},
          area: "col-span-1 place-self-center",
        },
        {
          id: 4,
          type: "PlayerBadge",
          props: {},
          area: "col-span-1 place-self-center",
        },
        {
          id: 5,
          type: "CardLink",
          props: {},
          area: "col-span-1 place-self-center",
        },
        {
          id: 6,
          type: "ProductCollectionWidget",
          props: {},
          area: "col-span-full ",
        },
      ],
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
