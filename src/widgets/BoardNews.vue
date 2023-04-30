<template>
  <v-card>
    <v-carousel
      cycle
      height="400"
      :hide-delimiters="true"
      hide-delimiter-background
      show-arrows="hover"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet class="!glass !max-h-[920px]" height="100%">
          <div class="flex flex-col lg:grid grid-cols-2 h-full">
            <div class="duration-300 hover:h-full h-2/6 lg:h-full">
              <v-img :src="slide.img" cover class="h-full w-full"></v-img>
            </div>
            <div id="text-content-container" class="h-full bg-base-100">
              <v-container>
                <article
                  class="overflow-auto !text-base prose prose-sm prose-slate"
                >
                  <h1>
                    {{ slide.content.punchline }}
                  </h1>
                  <p class="indent-10">
                    {{
                      slide.content.paragraphs.length > 300
                        ? slide.content.paragraphs.slice(0, 300) + "..."
                        : slide.content.paragraphs
                    }}
                  </p>
                </article>

                <v-tooltip location="top" text="อ่าน">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      class="absolute bottom-5 right-5 !text-base-content"
                      variant="tonal"
                      icon="mdi-eye-arrow-right-outline"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </v-container>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>
<script lang="ts">
export default {
  data() {
    return {
      colors: ["indigo", "warning", "pink darken-2"],
      slides: [
        {
          content: {
            punchline: "PunchLine",
            paragraphs:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non culpa fugiat delectus corporis expedita provident! Magni fuga omnis nam ullam ipsa temporibus voluptates in nesciunt! Necessitatibus voluptates aliquid accusantium.F",
          },
          img: "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        },
        {
          content: {
            punchline: "PunchLine",
            paragraphs:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non culpa fugiat delectus corporis expedita provident! Magni fuga omnis nam ullam ipsa temporibus voluptates in nesciunt! Necessitatibus voluptates aliquid accusantium.F",
          },
          img: "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        },
        {
          content: {
            punchline: "PunchLine",
            paragraphs:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non culpa fugiat delectus corporis expedita provident! Magni fuga omnis nam ullam ipsa temporibus voluptates in nesciunt! Necessitatibus voluptates aliquid accusantium.F",
          },
          img: "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
