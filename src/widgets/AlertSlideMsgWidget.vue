<script lang="ts">
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
<template>
  <v-card height="50">
    <div class="parent">
      <v-icon
        class="absolute h-full w-12 z-10 bg-primary-focus text-primary-content"
        icon="mdi-bullhorn-variant"
      ></v-icon>
      <v-card-title class="text-md msg-slide-left">
        <span>
          {{
            message
              ? message
              : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos fugiate xercitationem reprehenderit dolorem maiores nobis, recusandae lor"
          }}
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
