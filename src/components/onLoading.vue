<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
export default {
  setup() {
    return {
      appBarConfig: useConfigComponentStore().getAppBarConfig,
    };
  },
  props: {
    delay: Number,
  },
  mounted() {
    this.fakeLoader().then((res) => {
      this.$emit("loadedAsync", res);
    });
  },
  methods: {
    async fakeLoader() {
      const res = new Promise((r) => setTimeout(r, this.delay || 1000)).then(
        () => {
          return false;
        }
      );
      return res;
    },
  },
};
</script>

<template>
  <div class="w-full bg-base-300 fixed">
    <div class="grid h-screen">
      <v-img
        class="place-self-center animate-ping"
        width="100"
        :src="
          appBarConfig.brandImg.length
            ? appBarConfig.brandImg
            : 'src/assets/images/loading-image-example.png'
        "
      ></v-img>
    </div>
  </div>
</template>
