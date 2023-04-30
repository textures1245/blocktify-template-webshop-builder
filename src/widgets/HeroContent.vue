<script lang="ts">
import { useConfigComponentStore } from "../configs/configCPNStore";
export default {
  props: {
    showLogo: Boolean,
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
  },
  setup() {
    return {
      appBarConfig: useConfigComponentStore().getAppBarConfig,
    };
  },
};
</script>
<template>
  <section class="flex flex-col justify-center items-center gap-4">
    <div v-if="showLogo" id="logo" class="avatar">
      <v-img
        :src="appBarConfig.brandImg"
        :class="['w-24', appBarConfig.avatar]"
        alt=""
      />
    </div>
    <div id="text-content" class="text-white text-center">
      <h1 class="text-4xl light-keyframes font-bold">
        {{ title || "Title" }}
      </h1>
      <p class="text-md light-keyframes">{{ subtitle || "" }}</p>
    </div>
  </section>
</template>
<style scoped lang="scss">
@keyframes lights {
  0% {
    color: hsl(230, 40%, 80%);
    text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
      0 0 0.125em hsla(320, 100%, 60%, 0.3),
      -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
      1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
  }

  30% {
    color: hsl(230, 80%, 90%);
    text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 60%, 0.5),
      -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
      0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
  }

  40% {
    color: hsl(230, 100%, 95%);
    text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 90%, 0.5),
      -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
      0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4);
  }

  70% {
    color: hsl(230, 80%, 90%);
    text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 60%, 0.5),
      0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
      -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
  }

  100% {
    color: hsl(230, 40%, 80%);
    text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
      0 0 0.125em hsla(320, 100%, 60%, 0.3),
      1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
      -1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
  }
}

.light-keyframes {
  margin: auto;
  animation: lights 5s 750ms linear infinite;
}
</style>
