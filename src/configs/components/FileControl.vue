<script lang="ts">
import axios from "axios";
import FormData from "form-data";
import { useConfigComponentStore } from "../configCPNStore";
import Swal from "sweetalert2";
import { PropType, ref } from "vue";

type FileResponse = {
  data: {
    status: 200 | 400 | 500;
    error: string | null;
    message: {
      url: string;
    } | null;
  };
};

export default {
  props: {
    action: {
      type: String as PropType<"image" | "file">,
      required: true,
    },
    storage: {
      type: [Array, String],
      required: true,
      readonly: false,
    },
  },
  emits: ["fileEmitter"],
  setup() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    const websiteConfig = useConfigComponentStore().getWebsiteConfig;

    const data = new FormData();
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "",
      headers: {
        ...data.getHeaders,
        "x-store-id": websiteConfig.storeID,
      },
      data,
    };

    return { data, config, Toast };
  },

  data() {
    return {
      fileControl: ref<File>(),
      fileUrlControl: ref<string | null>(null),
      imageUrlPreview: ref(""),
      uploadMethod: "file",
      rule: {
        MAX_FILE_SIZE: 2000000,
      },
    };
  },

  watch: {
    uploadMethod() {
      this.clearForm();
    },
  },

  methods: {
    formatBytes(a: number, b = 2) {
      if (!+a) return "0 Bytes";
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
      return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
        ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
      }`;
    },

    onFileImageSelector(event: Event) {
      const target = event.target as HTMLInputElement;
      this.fileControl = target.files?.[0];
      if (this.fileControl) {
        this.imageUrlPreview = URL.createObjectURL(this.fileControl);
      } else {
        this.imageUrlPreview = "";
      }
    },

    validateFileSize(file: File, action: "file" | "image") {
      if (action === "image" && file.size > this.rule.MAX_FILE_SIZE) {
        this.Toast.fire({
          icon: "warning",
          title: `กรุณาใส่ไฟล์รูปภาพที่มีขนาดไม่เกิน 2MB (รูปภาพปัจจุบันขนาด ${this.formatBytes(
            file.size
          )})`,
        });
        return false;
      }
      return true;
    },

    onChangedImageUrlInput() {
      this.imageUrlPreview = this.fileUrlControl!;
    },

    onUploadFile(action: "file" | "image") {
      if (!this.fileControl) {
        return this.Toast.fire({
          icon: "warning",
          title: "โปรดใส่ไฟล์ก่อนอัปโหลด",
        });
      }

      //- validation for image file's size
      if (!this.validateFileSize(this.fileControl, action)) return;

      this.data.append(action, this.fileControl);

      this.config.url =
        action === "image"
          ? import.meta.env.VITE_UPLOAD_IMAGE_API
          : import.meta.env.VITE_UPLOAD_FILE_API;

      axios(this.config)
        .then((response) => {
          if (response.data) {
            const { data, status } = response.data;
            const isImageAction = action === "image";
            const isFileAction = action === "file";

            if (isImageAction && status === 200) {
              if (Array.isArray(this.storage)) {
                this.storage.push(data.message.url);
              } else {
                this.$emit("fileEmitter", data.message.url);
              }
              this.Toast.fire({
                icon: "success",
                title: "อัปโหลดเสร็จสิ้นเรียบร้อยแล้ว",
              });
            } else if (isFileAction && status === 200) {
              this.$emit("fileEmitter", data.message.url);
              this.Toast.fire({
                icon: "success",
                title: "อัปโหลดเสร็จสิ้นเรียบร้อยแล้ว",
              });
            } else if (status === 400) {
              this.Toast.fire({
                icon: "error",
                title: "ประเภทไฟล์ที่ส่งไม่ถูกต้อง",
              });
            } else {
              this.Toast.fire({
                icon: "error",
                title: "อินเทอร์เน็ตมีปัญหา โปรดลองใหม่อีกครั้งในภายหลัง",
              });
            }
          }
        })
        .catch((error) => {
          alert(
            "มีบางอย่างขัดข้อง โปรดลองใหม่อีกครั้งในภายหลัง หรือโปรดแจ้งเจ้าหน้าที่ให้รับทราบ"
          );
          console.error(error);
        });
      this.clearForm();
    },

    onUploadImageURL() {
      if (!this.fileUrlControl) {
        return this.Toast.fire({
          icon: "warning",
          title: "โปรดใส่ไฟล์ก่อนอัปโหลด",
        });
      } else {
        this.config.url = import.meta.env.VITE_UPLOAD_IMAGE_API;
        if (Array.isArray(this.storage)) {
          this.storage.push(this.fileUrlControl);
        } else {
          this.$emit("fileEmitter", this.fileUrlControl);
        }
        this.Toast.fire({
          icon: "success",
          title: "อัปโหลดเสร็จสิ้นเรียบร้อยแล้ว",
        });
      }
      this.clearForm();
    },

    clearForm() {
      this.config.url = "";
      this.fileControl = {} as File;
      this.fileUrlControl = null;
      this.imageUrlPreview = "";

      this.data = new FormData();
    },
  },

  beforeDestroy() {
    if (this.imageUrlPreview !== "") {
      URL.revokeObjectURL(this.imageUrlPreview);
    }
  },
};
</script>
<template>
  <div class="my-2 mb-5">
    <FormKit
      type="form"
      id="file-form-controller"
      @submit="
        uploadMethod === 'file' ? onUploadFile(action) : onUploadImageURL()
      "
      :actions="false"
    >
      <div id="form-wrapper">
        <FormKit
          v-if="action === 'image'"
          type="select"
          label="เลือกแนวทางในการอัปโหลดไฟล์"
          name="file-selector-options"
          :options="{
            file: 'อัปโหลดโดยการเลือกไฟล์',
            url: 'อัปโหลดโดยการใส่ลิ้ง URL',
          }"
          v-model="uploadMethod"
          input-class="w-screen h-full"
        />
        <section v-if="imageUrlPreview" id="img-preview" class="my-4">
          <v-img :src="imageUrlPreview" sizes="32"></v-img>
        </section>

        <div id="file-upload-control">
          <FormKit
            v-if="uploadMethod === 'file'"
            if="file-uploader-control"
            type="file"
            input-class="w-full h-full"
            :accept="
              action === 'image'
                ? '.jpg,.jpeg,.png'
                : '.pdf,.doc,.docx,.xml,.md,.csv'
            "
            :label="
              action === 'image'
                ? 'เลือกรูปภาพที่ต้องการลง'
                : 'เลือกไฟล์ที่ต้องการลง'
            "
            @change="onFileImageSelector"
            name="images-carousel"
            help-class="w-9/12"
            :help="
              action === 'image'
                ? 'ไฟล์รูปภาพที่จะอัพโหลด ต้องเป็นประเภท jpg, jpeg หรือ png และต้องมีขนาดน้อยกว่า 2MB'
                : ''
            "
          >
            <template #fileRemove> </template>
          </FormKit>
          <FormKit
            @blur="onChangedImageUrlInput()"
            type="text"
            v-if="uploadMethod === 'url'"
            validation="url"
            input-class="w-screen h-full"
            v-model="fileUrlControl"
            label="เลือก URL รูปภาพที่ต้องการ"
            help-class="w-8/12"
            name="file-url-control"
            :help="'รูปภาพที่เอามาจาก Link URL มีโอกาสที่รูปภาพจะหมดอายุ (ไม่สามารถโหลดรูปภาพได้) ดั้งนั้นควรมั่นตรวจสอบรูปภาพของคุณ'"
          >
          </FormKit>
        </div>
        <div class="flex justify-center">
          <FormKit
            type="submit"
            label="อัปโหลด"
            name="file-upload-submit"
          ></FormKit>
        </div>
      </div>
    </FormKit>
  </div>
</template>
<style lang="scss"></style>
