<script lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";
export default {
  components: { QuillEditor },
  emits: ["quillContentEmitter"],
  props: {
    quillContent: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "กรอกเนื้อหา (Content)",
    },
    title: {
      type: String,
      default: "กรอกเนื้อหา",
    },
    lengthLimits: {
      type: Number,
      default: 255,
    },
  },
  data() {
    return {
      dialog: false,
      quillContentControl: "",
    };
  },

  methods: {
    onEmitter() {
      if (
        this.quillContentControl === "<p><br></p>" ||
        this.quillContentControl.length > this.lengthLimits
      ) {
        return alert(
          `ตัวกรอกข้อมูลห้ามว้างหรือมีมากกว่า ${this.lengthLimits} ตัว`
        );
      }

      this.$emit("quillContentEmitter", this.quillContentControl);
    },

    onInitialContent() {
      this.quillContentControl = this.quillContent;
    },
  },
};
</script>
<template>
  <div id="text-editor-control">
    <v-dialog v-model="dialog" :persistent="true" width="auto">
      <template v-slot:activator="{ props }">
        <div class="flex justify-between items-center">
          <label
            for="text-editor-control"
            class="text-sm font-bold font-sans"
            >{{ label }}</label
          >
          <v-btn
            @click="onInitialContent"
            class="!btn-secondary"
            v-bind="props"
          >
            กดเพื่อเขียนเนื้อหา
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <QuillEditor
            class="!min-h-[400px]"
            contentType="html"
            v-model:content="quillContentControl"
            placeholder="โปรดกรอกข้อมูล"
            theme="snow"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="[onEmitter(), (dialog = false)]"
          >
            บันทึก
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="[(dialog = false), (quillContentControl = '')]"
          >
            ปิด
          </v-btn>
          <p
            v-if="quillContentControl.length > 500"
            class="text-sm text-slate-400"
          >
            ตัวอักษรไม่สามารถมีมากกว่า {{ lengthLimits }} ตัวได้
          </p>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss"></style>
