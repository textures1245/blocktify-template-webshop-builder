<script lang="ts">
// @ts-nocheck
import { PropType } from "vue";
import { YoutubeIFrame } from "../configs/configCSS";

export default {
  props: {
    props: {
      type: Object as PropType<YoutubeIFrame>,
      required: true,
    },
    customHeight: {
      type: String,
    },
  },
  data() {
    return { player: <any>null };
  },
  async mounted() {
    this.loadYouTubeAPI().then(() => {
      this.onYouTubeIframeAPIReady();
    });
  },
  methods: {
    loadYouTubeAPI() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode!.insertBefore(script, firstScriptTag);

        script.addEventListener("load", () => {
          resolve(true);
        });

        script.addEventListener("error", () => {
          reject(new Error("Failed to load YouTube API."));
        });
      });
    },
    onYouTubeIframeAPIReady() {
      this.player = new YT.Player("player", {
        height: this.customHeight || "400",
        width: "100%",
        videoId: this.props.youtubeId,
        playerVars: {
          autoplay: 0,
        },
        events: {
          // Add any desired event handlers here
        },
      });
    },
  },
};
</script>
<template>
  <v-card class="bg-base-300 text-base-content">
    <v-card-title
      class="!bg-primary !text-primary-content !text-lg"
      v-if="props.title"
      ><v-icon icon="mdi-video"></v-icon>
      {{ props.title }}</v-card-title
    >
    <div id="player"></div>
  </v-card>
</template>
<style lang="scss"></style>
