<script lang="ts">
import { computed, reactive, ref } from "vue";
import { useConfigComponentStore } from "./configs/configCPNStore";
import router from "./routers/routerApp";
export default {
  components: {},
  setup() {
    /* ... */
    const keepAliveExcludes = reactive(new Set());

    const keepAliveExcluder = {
      add: (name: any) => keepAliveExcludes.add(name),
      remove: (name: any) => keepAliveExcludes.delete(name),
    };

    router.beforeEach((to, from, next) => {
      if (to.meta?.excludeKeepAlive === true) {
        keepAliveExcluder.add(to.name);
      }
      next();
    });
    /* ... */

    return {
      keepAliveExcludes: computed(() => Array.from(keepAliveExcludes)),
      globalCSSConfig: useConfigComponentStore().getGlobalConfig,
    };
  },
};
</script>
<template>
  <v-app :data-theme="globalCSSConfig.themeColor" class="!scroll-smooth">
    <div
      :style="`font-family: '${globalCSSConfig.fontFamily}', sans-serif;`"
      :class="`!text-${globalCSSConfig.fontSize} `"
    >
      <router-view> </router-view>
    </div>
  </v-app>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Anuphan&family=Chakra+Petch&family=Itim&family=Kanit:wght@200&family=Mitr&family=Noto+Sans+Thai&family=Pattaya&family=Prompt&family=Taviraj&display=swap");
</style>
