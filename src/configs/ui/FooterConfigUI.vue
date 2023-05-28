<script lang="ts">
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore } from "../configCPNStore";
import TextEditorControl from "../components/TextEditorControl.vue";
import Swal from "sweetalert2";
import FileControl from "../components/FileControl.vue";

export default {
  components: { CardExpand, CardExpandPanel, FileControl, TextEditorControl },
  setup() {
    const store = useConfigComponentStore();

    return {
      config: store.getFooterConfig,
      globalConfig: store.getGlobalConfig,
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

  data() {
    return {
      followActionOpts: ["youtube", "facebook", "twitter", "discord"],
      followActionOptsLeft: [],
      formControls: {
        followControl: {
          action: "",
          linkUrl: "",
        },
      },
    };
  },

  methods: {
    onAddNewFollowAction() {
      this.config.followProps.requires.push(
        this.formControls.followControl as {
          action: "youtube" | "facebook" | "twitter" | "discord";
          linkUrl: string;
        }
      );
      this.Toast.fire("ได้ทำการเพิ่มข้อมูลเรียบน้อย", "", "success");

      this.formControls = {
        followControl: {
          action: "",
          linkUrl: "",
        },
      };
    },

    filterActions() {
      return this.followActionOpts.filter(
        (action: any) =>
          !this.config.followProps.requires
            .map((el) => el.action)
            .includes(action)
      );
    },

    onRemoveFollowAction(actionIndex: number) {
      this.config.followProps.requires.splice(actionIndex, 1);
      return this.Toast.fire({ icon: "success", title: "ลบเรียบร้อยแล้ว" });
    },
  },
};
</script>
<template>
  <CardExpand
    :item-preview="false"
    headline="เกี่ยวกับเว็บไซต์ (About Website)"
  >
    <template #content>
      <FormKit
        type="text"
        label="หัวเรื่อง"
        disabled
        :value="`เกี่ยวกับ ${globalConfig.websiteName}`"
        help="ตัวเลือกนี้ไม่สามารถเปลี่ยนแปลงได้"
      ></FormKit>
      <TextEditorControl
        label="ข้อความเกี่ยวกับเว็บไซต์"
        :length-limits="1000"
        :quill-content="config.webInfo.aboutContent"
        title="ข้อความเกี่ยวกับเว็บไซต์ (ไม่เกิน 1000 ตัวอักศร)"
      ></TextEditorControl>
    </template>
  </CardExpand>
  <CardExpand
    :item-preview="config.bg.isImage"
    headline="พื้นหลังฟูตเตอร์ ( Footer Background)"
  >
    <template v-if="config.bg.isImage" #item-preview>
      <img :src="config.bg.src!" />
    </template>
    <template #content>
      <FormKit
        type="checkbox"
        v-model="config.bg.isImage"
        label="ตัวเลือก"
        outer-class="!mt-2"
        help="เช็คถูกเพื่อใช้รูปภาพเป็น BG หรือไม่กดเช็คเพื่อเลือก BG ตามโทนสีทีม"
      ></FormKit>
      <FileControl
        v-if="config.bg.isImage"
        @file-emitter="(imgSrc) => (config.bg.src = imgSrc)"
        action="image"
        :storage="(config.bg.src) as string"
      ></FileControl>
    </template>
  </CardExpand>
  <CardExpand :item-preview="false" headline="ปุ่มติดตาม (Follow Actions)">
    <template #content>
      <FormKit type="form" :actions="false" @submit="onAddNewFollowAction">
        <FormKit
          type="select"
          label="เลือก Platform"
          :options="filterActions()"
          placeholder="เลือก Platform"
          validation="required"
          v-model="formControls.followControl.action"
        ></FormKit>
        <FormKit
          type="text"
          validation="required|url"
          label="กรอก URL สำหรับลิ้งไปยังหน้าเว็บ"
          v-model="formControls.followControl.linkUrl"
        ></FormKit>
        <div class="flex justify-center">
          <FormKit type="submit" label="เพิ่มปุ่มการติดตาม"></FormKit>
        </div>
      </FormKit>

      <section id="follow-action-content-list">
        <div class="" v-for="(action, i) in config.followProps.requires">
          <h2 class="hr">
            <span class="hr-text">{{ i + 1 }}</span>
          </h2>
          <FormKit
            disabled
            type="text"
            placeholder="Platform"
            validation="required"
            label="Platform"
            v-model="action.action"
          ></FormKit>
          <FormKit
            type="text"
            validation="required|url"
            label="URL สำหรับลิ้งไปยังหน้าเว็บ"
            disabled
            v-model="action.linkUrl"
          ></FormKit>
          <div class="flex justify-end">
            <v-btn
              size="small"
              @click="onRemoveFollowAction(i)"
              class="!btn-error"
              >ลบ</v-btn
            >
          </div>
        </div>
      </section>
    </template>
  </CardExpand>
</template>
<style scoped lang="sass"></style>
