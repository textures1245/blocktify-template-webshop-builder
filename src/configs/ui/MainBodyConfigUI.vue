<script lang="ts">
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore, useHelpConfigStore } from "../configCPNStore";
import AlertSlideMsgWidget from "../../widgets/AlertSlideMsgWidget.vue";
import FileControl from "../components/FileControl.vue";
import TextEditorControl from "../components/TextEditorControl.vue";
import {
  BoardNews,
  BoardNewsProp,
  CardLink,
  CardLinkProp,
  ProductCollectionGrid,
  ProductCollectionGridProp,
} from "../configCSS";
import Swal from "sweetalert2";
export default {
  components: {
    CardExpand,
    CardExpandPanel,
    AlertSlideMsgWidget,
    FileControl,
    TextEditorControl,
  },
  setup() {
    const store = useConfigComponentStore();
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

    return {
      config: store.getMainBodyConfig,
      helpConfig: useHelpConfigStore(),
      Toast,
    };
  },
  data() {
    return {
      configOpts: {
        mainContentSelectors: {
          AlertSlideMsgWidget: "กล่องข้อความประกาศ",
          BoardNews: "บอร์ดข่าวสาร",
        },
      },
      formControls: {
        boardNews: <BoardNews>{
          image: "",
          context: {
            title: "",
            content: "",
          },
        },
        cardLink: {} as CardLink,
        prodCollection: {} as ProductCollectionGrid,
      },
      currentPage: 1,
    };
  },

  methods: {
    onAddNews() {
      if (
        !this.formControls.boardNews.context.content ||
        !this.formControls.boardNews.context.title ||
        !this.formControls.boardNews.image
      ) {
        return this.Toast.fire({
          icon: "warning",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
      let newsProp: BoardNews = this.formControls.boardNews;
      this.config.setting.mainContent.boardNews.props.news.push(newsProp);
      //- clear input control
      this.formControls.boardNews = {} as BoardNews;
    },
  },
};
</script>
<template>
  <CardExpand headline="คอนเทนต์หลัก (Highligh Contents)">
    <template #content>
      <FormKit
        type="checkbox"
        label="เลือกคอนเทนต์หลักที่คุณต้องการโชว์"
        name="main-content-selector"
        v-model="config.setting.mainContent.requires"
        :options="configOpts.mainContentSelectors"
        placeholder="Adjust opacity."
      ></FormKit>
    </template>
  </CardExpand>
  <v-expansion-panels multiple>
    <CardExpandPanel
      v-if="config.setting.mainContent.requires.includes('AlertSlideMsgWidget')"
      id="alert-slide-msg-widget"
      :item-preview="true"
      title="กล่องข้อความประกาศ"
    >
      <template #item-preview>
        <AlertSlideMsgWidget
          :message="config.setting.mainContent.alertMsg.props.msg"
        ></AlertSlideMsgWidget>
      </template>
      <template #content>
        <section id="msg-props">
          <FormKit
            v-model="config.setting.mainContent.alertMsg.props.msg"
            type="text"
            label="กรอกข้อความที่ต้องการโชว์"
            name="alert-msg-text"
            :help="helpConfig.lengthLabel(40)"
            validation="required|length:40,0"
          ></FormKit>
        </section>
      </template>
    </CardExpandPanel>
    <CardExpandPanel id="board-news" :item-preview="false" title="บอร์ดข่าวสาร">
      <template #content>
        <section id="news-props-form-control">
          <div id="news-img-uploader-control">
            <FileControl
              @file-emitter="(imgUrl: string) => formControls.boardNews.image = imgUrl"
              :storage="formControls.boardNews.image"
              action="image"
            ></FileControl>
          </div>
          <section name="news-img-preview" class="my-2">
            <label class="text-sm font-bold font-sans">รูปภาพ</label>
            <v-img
              :src="
                formControls.boardNews.image ||
                'https://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/image-preview.png'
              "
              sizes="32"
              class="object-cover max-h-64 mt-3"
            ></v-img>
            <p id="news-img-preview-help" class="text-xs text-slate-600">
              *ถ้ารูปภาพถูกของคุณถูกอัปโหลดแล้วจะแสดงขึ้นในตรง*
            </p>
          </section>
          <FormKit
            type="form"
            id="news-content-control"
            @submit=""
            :actions="false"
          >
            <FormKit
              id="news-title"
              v-model="formControls.boardNews.context.title"
              type="text"
              label="กรอกข้อความชื่อเรื่อง (Title)"
              name="news-title"
              :help="helpConfig.lengthLabel(20)"
              validation="required|length:20,0"
            ></FormKit>
            <TextEditorControl
              :title="`กรอกเนื้อหา (${helpConfig.lengthLabel(500)})`"
              @quill-content-emitter="(content: string) => formControls.boardNews.context.content"
              :quill-content="formControls.boardNews.context.content"
            ></TextEditorControl>

            <div class="flex justify-center my-4 mt-6">
              <FormKit type="submit" label="เพิ่มข้อมูล"></FormKit>
            </div>
          </FormKit>
        </section>
        <v-card class="my-5">
          <v-divider></v-divider>
        </v-card>
        <section id="news-props-group">
          <p class="text-sm font-semibold text-end">
            ทั้งหมด
            {{ config.setting.mainContent.boardNews.props.news?.length }} รายการ
          </p>
          <v-pagination v-model="currentPage" length="5">
            <div
              v-for="newProp in config.setting.mainContent.boardNews.props.news"
              id="news-prop"
              class="flex flex-col gap-4"
            >
              <section name="news-img-preview-readonly">
                <label
                  for="text-editor-control"
                  class="text-sm font-bold font-sans"
                  >รูปภาพ</label
                >
                <v-img
                  :src="newProp.image"
                  sizes="32"
                  class="object-cover max-h-64 mt-3"
                ></v-img>
              </section>
              <FormKit
                disabled
                v-model="newProp.context.title"
                type="text"
                label="หัวเรื่อง"
                name="news-title-readonly"
              ></FormKit>
              <FormKit
                disabled
                v-model="newProp.context.content"
                type="textarea"
                label="เนื้อเรื่อง"
                class="!text-xs"
                name="news-content-readonly"
              ></FormKit>
            </div>
          </v-pagination>
          <v-card>
            <v-divider></v-divider>
          </v-card>
        </section>
      </template>
    </CardExpandPanel>
  </v-expansion-panels>
</template>
<style scoped lang="sass"></style>
