<script lang="ts">
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { loadFirePreset } from "tsparticles-preset-fire";
import presetJSON from "./../assets/json/prticlePresets.json";

import { PropType } from "vue";

export type ParticlePreset =
  | "snow"
  | "firefly"
  | "stars"
  | "fire"
  | "fireworks"
  | "space"
  | "bubbles"
  | "space_stars"
  | "null";

export default {
  props: {
    presetOpt: { type: String as PropType<ParticlePreset>, default: "null" },
    fullscreen: Boolean,
  },

  data() {
    return {
      presetJSON: presetJSON as Record<
        | "snow"
        | "firefly"
        | "stars"
        | "fire"
        | "fireworks"
        | "space"
        | "bubbles"
        | "space_stars",
        any
      >,
      particlesOptions: {
        preset: this.presetOpt,
        fullScreen: { enable: true, zIndex: this.fullscreen ? 1 : 0 },
        background: {
          image: "",
          color: "",
        },
      },
    };
  },

  computed: {
    particleType() {
      if (this.presetOpt === "null") {
        return;
      } else if (
        ["snow", "firefly", "stars", "fire", "fireworks"].includes(
          this.presetOpt
        )
      ) {
        return this.particlesOptions;
      } else {
        return {
          ...this.presetJSON[this.presetOpt],
          fullScreen: { enable: true, zIndex: this.fullscreen ? 1 : 0 },
        };
      }
    },
  },

  methods: {
    async particlesInit(engine: Engine): Promise<void> {
      switch (this.presetOpt) {
        case "snow":
          await loadSnowPreset(engine);
          break;
        case "firefly":
          await loadFireflyPreset(engine);
          break;
        case "stars":
          await loadStarsPreset(engine);
          break;
        case "fire":
          await loadFirePreset(engine);
          break;
        case "fireworks":
          await loadFireworksPreset(engine);
          break;
        default:
          await loadFull(engine);
          break;
      }
    },
  },
};
</script>
<template>
  <div id="preset">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particleType"
    />
  </div>
</template>
<style lang="scss"></style>
