<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    props: {
      type: Object as PropType<{ msg: string }>,
      required: true,
    },
  },
};
</script>
<template>
  <v-card height="50" class="bg-base-200 text-base-content">
    <div class="">
      <v-icon
        class="absolute h-full w-12 z-10 bg-primary-focus text-primary-content"
        icon="mdi-bullhorn-variant"
      ></v-icon>
      <v-card-title class="text-md msg-slide-left">
        <span>
          {{ props.msg }}
        </span>
      </v-card-title>
    </div>
  </v-card>
</template>
<style lang="scss">
.parent {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}

.msg-slide-left {
  display: flex;
  flex-shrink: 0;
  animation: slide-left 10s linear infinite;
  background: none;
  span {
    display: inline-block;
    font-weight: 50;
    padding-left: 0.5em;
  }
}

.msg-slide-left > span {
}
@keyframes slide-left {
  0% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(-1000px);
  }
}
</style>
