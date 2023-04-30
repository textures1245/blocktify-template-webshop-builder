<script lang="ts">
import Swal from "sweetalert2";

import { PropType } from "vue";

export default {
  setup() {
    return {
      Toast: Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }),
    };
  },
  props: {
    imgList: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  methods: {
    onRemoveImage(imgIndex: number) {
      this.imgList.splice(imgIndex, 1);
      return this.Toast.fire({
        icon: "success",
        title: "ลบไฟล์เรียบร้อยแล้ว",
      });
    },
  },
};
</script>
<template>
  <p class="text-semibold mt-2">รูปภาพทั้งหมด {{ imgList.length }} รูป</p>
  <div v-if="imgList.length > 0" id="images-list" class="flex flex-col gap-2">
    <hr />
    <section class="mb-4" id="img-container" v-for="(src, i) in imgList">
      <div class="flex flex-col gap-4 place-items-center">
        <div class="w-full max-h-48">
          <v-img :src="src"></v-img>
        </div>
        <h2 class="hr"><span class="hr-text">ITEM PREVIEW</span></h2>
      </div>
      <div class="flex items-center">
        <v-file-input
          disabled
          variant="underlined"
          :label="`image-${i + 1}`"
        ></v-file-input>
        <v-btn size="small" @click="onRemoveImage(i)" class="!btn-error"
          >ลบ</v-btn
        >
      </div>
      <hr />
    </section>
  </div>
</template>
<style lang="scss"></style>
