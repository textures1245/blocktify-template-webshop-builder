<script lang="ts">
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import ImageFileList from "../../components/ImageFileList.vue";
import FileControl from "../components/FileControl.vue";
export default {
  components: { CardExpand, CardExpandPanel, ImageFileList, FileControl },
  setup() {
    const configStore = useConfigComponentStore();
    return { config: configStore.HeaderBarConfig };
  },
  data() {
    return { configOpts: {} };
  },
};
</script>
<template>
  <CardExpand headline="คอนเทนต์ (Header Contents)"> </CardExpand>
  <v-expansion-panels multiple>
    <CardExpandPanel :item-preview="false" title="ภาพสไลด์ (Image Carousel)">
      <template #content>
        <FileControl
          :storage="config.contents.carousel.images"
          action="image"
        ></FileControl>
        <ImageFileList
          :img-list="config.contents.carousel.images"
        ></ImageFileList>
      </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style lang="scss"></style>
