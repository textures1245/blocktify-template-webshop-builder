<script lang="ts">
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import CardExpand from "../../components/CardExpand.vue";
import { useConfigComponentStore, useHelpConfigStore } from "../configCPNStore";
import AlertSlideMsgWidget from "../../widgets/AlertSlideMsgWidget.vue";
import FileControl from "../components/FileControl.vue";
import TextEditorControl from "../components/TextEditorControl.vue";
import PaginationControl from "../components/PaginationControl.vue";
import { BoardNews, CardLink, ProductCollectionGrid } from "../configCSS";
import Swal from "sweetalert2";
import { config } from "dotenv";
import { Ref, ref, nextTick, reactive } from "vue";
import ControlSlot from "../components/ControlSlot.vue";
import ActionGroupControl from "../components/ActionGroupControl.vue";
import { storeToRefs } from "pinia";

export default {
  components: {
    CardExpand,
    CardExpandPanel,
    AlertSlideMsgWidget,
    FileControl,
    TextEditorControl,
    PaginationControl,
    ControlSlot,
    ActionGroupControl,
  },
  setup() {
    const store = useConfigComponentStore();
    const { getMainBodyConfig } = storeToRefs(store);
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
      config: getMainBodyConfig,
      store,
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
        subContentSelectors: {
          ProductCollectionGrid: "คอเลคชั่นสินค้าโชว์เคศ",
          CardLink: "การ์ดลิ้ง URL",
        },
        productSortActions: {
          HIGHTEST_PRICE: "เรียงจากราคาสูงสุดที่สุด",
          HIGHEST_SOLD_OFF: "เรียงจากยอดขายสูงสุด",
          LOWEST_PRICE: "เรียงจากราคาน้อยที่สุด",
          LOWEST_SOLD_OFF: "เรียงจากยอดขายน้อยที่สุด",
          CUSTOM: "จัดเรียง (*กำลังพัฒนา*)",
        },
      },
      formControls: {
        formEditorsTag: <"BOARD" | "COLLECTION" | "CARD" | "NONE">"NONE",
        boardNews: {
          control: <BoardNews>{
            image: "",
            context: {
              title: "",
              content: "",
            },
          },
          items: reactive(<BoardNews[]>[]),
        },
        prodCollection: {
          control: <ProductCollectionGrid>{
            sortAction: "HIGHEST_SOLD_OFF",
            limits: 8,
          },
          items: reactive(<ProductCollectionGrid[]>[]),
        },
        cardLink: {
          control: <CardLink>{
            bgUrl: "",
            title: "",
            subtitle: "",
            linkUrl: "",
          },
          items: reactive(<CardLink[]>[]),
        },
      },
      currentPage: 1,
    };
  },

  mounted() {
    this.formControls.boardNews.items =
      this.config.setting.mainContent.boardNews.props.news;
  },

  computed: {
    generateId() {
      return (arr: any) => {
        return Math.max(...arr.map((item: any) => item.id), 0) + 1;
      };
    },
  },

  methods: {
    onTakeCURDAction(
      action: "EDIT" | "DELETE",
      itemId: number,
      componentItems: { id: number; [key: string]: any }[],
      formControl: { [key: string]: any }
    ) {
      if (action === "EDIT") {
        const findItem = componentItems.find((item) => item.id === itemId);
        if (findItem) {
          Object.assign(formControl, findItem);
        }
      } else {
        const index = componentItems.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          componentItems.splice(index, 1);
        }
        this.Toast.fire({
          icon: "success",
          text: "ข้อมูลถูกลบออกเรียบร้อยแล้ว",
        });
      }
    },

    onSubmitFormNews() {
      if (
        !this.formControls.boardNews.control.context.content ||
        !this.formControls.boardNews.control.context.title ||
        !this.formControls.boardNews.control.image
      ) {
        console.log(this.formControls.boardNews.control);
        return this.Toast.fire({
          icon: "warning",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      }
      let isEdit = this.formControls.formEditorsTag === "BOARD";
      let formData: BoardNews = {
        ...this.formControls.boardNews.control,
        id: isEdit
          ? this.formControls.boardNews.control.id
          : this.generateId(
              this.config.setting.mainContent.boardNews.props.news
            ),
      };
      if (!isEdit) {
        this.config.setting.mainContent.boardNews.props.news.push(formData);
      } else {
        let dataIndex =
          this.config.setting.mainContent.boardNews.props.news.findIndex(
            (item) => item.id === formData.id
          )!;
        this.config.setting.mainContent.boardNews.props.news[dataIndex] =
          formData;
      }

      this.Toast.fire({
        icon: "success",
        text: !isEdit
          ? "ข้อมูลที่เพิ่มเรียบร้อยแล้ว"
          : "ข้อมูลถูกอัปเดตเรียบร้อยแล้ว",
      });
      //- clear input control
      this.formControls.boardNews.control = {
        image: "",
        context: {
          title: "",
          content: "",
        },
      } as BoardNews;
      this.formControls.formEditorsTag = "NONE";
    },

    onSubmitFormCardLink() {
      const isEdit = this.formControls.formEditorsTag === "CARD";

      const defaultBgUrl =
        "https://e0.pxfuel.com/wallpapers/1010/712/desktop-wallpaper-minecraft-grass-block-box-dirt-texture-minecraft-minecraft-thumbnail.jpg";
      if (!this.formControls.cardLink.control.bgUrl) {
        this.formControls.cardLink.control.bgUrl = defaultBgUrl;
      }

      let formData = {
        ...this.formControls.cardLink.control,
        id: isEdit
          ? this.formControls.cardLink.control.id
          : this.generateId(this.config.setting.subContents.cardLink.props),
      };

      if (!isEdit) {
        this.config.setting.subContents.cardLink.props.push(formData);
      } else {
        let dataIndex =
          this.config.setting.subContents.cardLink.props.findIndex(
            (item) => item.id === formData.id
          )!;
        this.config.setting.subContents.cardLink.props[dataIndex] = formData;
      }

      this.Toast.fire({
        icon: "success",
        text: !isEdit
          ? "ข้อมูลที่เพิ่มเรียบร้อยแล้ว"
          : "ข้อมูลถูกอัปเดตเรียบร้อยแล้ว",
      });

      this.formControls.cardLink.control = {
        bgUrl: "",
        title: "",
        subtitle: "",
        linkUrl: "",
      } as CardLink;
      this.formControls.formEditorsTag = "NONE";
    },

    onSubmitFormCollection() {
      const isEdit = this.formControls.formEditorsTag === "COLLECTION";
      let formData = {
        id: isEdit
          ? this.formControls.prodCollection.control.id
          : this.generateId(
              this.config.setting.subContents.prodCollection.props
            ),
        sortAction: this.formControls.prodCollection.control.sortAction,
        limits: +this.formControls.prodCollection.control.limits,
      };
      if (!isEdit) {
        this.config.setting.subContents.prodCollection.props.push(formData);
      } else {
        let dataIndex =
          this.config.setting.subContents.prodCollection.props.findIndex(
            (item) => item.id === formData.id
          )!;
        this.config.setting.subContents.prodCollection.props[dataIndex] =
          formData;
      }

      this.Toast.fire({
        icon: "success",
        text: !isEdit
          ? "ข้อมูลที่เพิ่มเรียบร้อยแล้ว"
          : "ข้อมูลถูกอัปเดตเรียบร้อยแล้ว",
      });

      this.formControls.prodCollection.control = {
        sortAction: "HIGHEST_SOLD_OFF",
        limits: 4,
      } as ProductCollectionGrid;
      this.formControls.formEditorsTag = "NONE";
    },

    onInitialConfig() {
      Swal.fire({
        title: "ยืนยันส่วนของ Main content Setup",
        html: "กดยืนยันเพื่อทำการเรนเดอร์ UI Config, (หลังจากยืนยันเสร็จโปรดทำการสลับหน้า (ถ้าอยู่ในหน้าหลัก) เพื่อทำการ rerender contents) <p class='text-error font-semibold'>ห้ามรีเฟชเด็ดขาด เพื่อป้องกันการสูญเสียข้อมูลในกรณีที่คุณยังไม่ได้เซฟข้อมูลทั้งหมด</p>  ",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยันส่วนของเซตอัป",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.config.storageContents = this.store.getInitializedContents();
          Swal.fire({
            title: "ยืนยันการเซตอัปเรียบร้อย",
            html: "โปรดทำการสลับหน้า (ถ้าอยุ่ในหน้าหลัก) เพื่อทำการ rerender contents <p class='text-error font-semibold'>ห้ามรีเฟชเด็ดขาด เพื่อป้องกันการสูญเสียข้อมูลในกรณที่คุณยังไม่ได้เซฟมูลทั้งหมด</p>",
            icon: "success",
          });
        }
      });
    },

    debug(bug: any) {
      console.log(bug);
    },
  },
};
</script>
<template>
  <div class="flex flex-col gap-5">
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
    <v-expansion-panels>
      <CardExpandPanel
        v-if="
          config.setting.mainContent.requires.includes('AlertSlideMsgWidget')
        "
        id="alert-slide-msg-widget"
        :item-preview="true"
        title="กล่องข้อความประกาศ"
      >
        <template #item-preview>
          <AlertSlideMsgWidget
            :props="{ msg: config.setting.mainContent.alertMsg.props.msg }"
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
      <CardExpandPanel
        id="board-news"
        :item-preview="false"
        title="บอร์ดข่าวสาร"
      >
        <template #content>
          <section id="news-props-form-control">
            <div id="news-img-uploader-control">
              <FileControl
                @file-emitter="(imgUrl: string) => formControls.boardNews.control.image = imgUrl"
                :storage="formControls.boardNews.control.image!"
                action="image"
              ></FileControl>
            </div>
            <section name="news-img-preview" class="my-2">
              <label class="text-sm font-bold font-sans"
                >รูปภาพพื้นหลัง *ไม่บังคับ*</label
              >
              <v-img
                :src="
                  formControls.boardNews.control.image ||
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
              @submit="onSubmitFormNews()"
              :actions="false"
            >
              <FormKit
                id="news-title"
                v-model="formControls.boardNews.control.context.title"
                type="text"
                label="กรอกข้อความชื่อเรื่อง (Title)"
                name="news-title"
                :help="helpConfig.lengthLabel(20)"
                validation="required|length:20,0"
              ></FormKit>
              <TextEditorControl
                :title="`กรอกเนื้อหา (${helpConfig.lengthLabel(500)})`"
                @quill-content-emitter="(content: string) => formControls.boardNews.control.context.content = content"
                :quill-content="formControls.boardNews.control.context.content"
              ></TextEditorControl>

              <div class="flex justify-center my-4 mt-6">
                <FormKit
                  type="submit"
                  :label="
                    formControls.formEditorsTag === 'BOARD' ? 'อัปเดต' : 'เพิ่ม'
                  "
                ></FormKit>
              </div>
            </FormKit>
          </section>
          <v-card class="my-5">
            <v-divider></v-divider>
          </v-card>

          <ControlSlot
            :item-length="
              config.setting.mainContent.boardNews.props.news?.length
            "
          >
            <template #form-controls>
              <section id="news-props-group">
                <div
                  v-for="(newProp, i) in config.setting.mainContent.boardNews
                    .props.news"
                  id="news-prop"
                  class="flex flex-col gap-4"
                >
                  <h2 class="hr">
                    <span class="hr-text">{{ i + 1 }}</span>
                  </h2>
                  <section name="news-img-preview-readonly">
                    <label
                      for="text-editor-control"
                      class="text-sm font-bold font-sans"
                      >รูปภาพ</label
                    >
                    <v-img
                      :src="newProp.image!"
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
                  <ActionGroupControl
                    scrollToId="news-props-form-control"
                    :item-id="newProp.id"
                    @emit-action="(emitter: any) => [onTakeCURDAction(emitter.action, emitter.itemId, config.setting.mainContent.boardNews.props.news, formControls.boardNews.control), emitter.action === 'EDIT' ? formControls.formEditorsTag = 'CARD' : null]"
                  ></ActionGroupControl>
                </div>
                <!--! unused for unexpected behavior between array  -->

                <!-- <PaginationControl
                  :items-per-page="2"
                  @on-page-changed="
                (items: any[]) =>
                formControls.boardNews.items =
                  items
              "
                  :items="config.setting.mainContent.boardNews.props.news"
                ></PaginationControl> -->
                <v-card> </v-card>
              </section>
            </template>
          </ControlSlot>
        </template>
      </CardExpandPanel>
    </v-expansion-panels>

    <!--- Sub Components -->
    <CardExpand :item-preview="false" headline="คอนเทนต์รอง (Sub Contents)">
      <template #content> </template>
    </CardExpand>
    <v-expansion-panels>
      <CardExpandPanel title="คอเลคชั่นสินค้าโชว์เคส">
        <template #content>
          <section id="product-collection-form-control">
            <FormKit
              type="form"
              @submit="onSubmitFormCollection"
              :actions="false"
            >
              <FormKit
                v-model="formControls.prodCollection.control.sortAction"
                type="select"
                :options="configOpts.productSortActions"
                label="เลือกฟิวเตอร์ที่ต้องการจัดเรียง"
                name="sort-action"
              ></FormKit>
              <FormKit
                v-model="formControls.prodCollection.control.limits"
                type="number"
                step="4"
                max="12"
                min="4"
                label="เลือกลิมิตที่ต้องการโชว์สินค้า"
                name="sort-action"
              ></FormKit>
              <div class="flex justify-center">
                <FormKit
                  type="submit"
                  :disabled="
                    config.setting.subContents.prodCollection.props.length >=
                      2 && formControls.formEditorsTag !== 'COLLECTION'
                  "
                  help="สามารถเพิ่มได้มากสุด 2 อันเพื่อคง Performance ของเว็บไซต์ไว้"
                  :label="
                    formControls.formEditorsTag === 'COLLECTION'
                      ? 'อัปเดต'
                      : 'เพิ่ม'
                  "
                ></FormKit>
              </div>
            </FormKit>
          </section>
          <section id="product-collection-preview">
            <ControlSlot
              :item-length="
                config.setting.subContents.prodCollection.props.length
              "
            >
              <template #form-controls>
                <div id="product-collection-group">
                  <div
                    id="product"
                    v-for="(prod, i) in config.setting.subContents
                      .prodCollection.props"
                  >
                    <h2 class="hr">
                      <span class="hr-text">{{ i + 1 }}</span>
                    </h2>

                    <FormKit
                      disabled
                      v-model="prod.sortAction"
                      type="select"
                      :options="configOpts.productSortActions"
                      label="ตัวการจัดเรียง"
                      name="sort-action"
                    ></FormKit>
                    <FormKit
                      disabled
                      v-model="prod.limits"
                      type="select"
                      :options="[4, 8, 12]"
                      label="ลิมิตที่โชว์สินค้า"
                      name="sort-action"
                    ></FormKit>
                    <ActionGroupControl
                      scrollToId="product-collection-form-control"
                      :item-id="prod.id"
                      @emit-action="(emitter: any) => [onTakeCURDAction(emitter.action, emitter.itemId, config.setting.subContents.prodCollection.props, formControls.prodCollection.control), emitter.action === 'EDIT' ? formControls.formEditorsTag = 'COLLECTION' : null]"
                    ></ActionGroupControl>
                  </div>
                  <!--! unused for unexpected behavior between array  -->
                  <!-- <PaginationControl
                    :items-per-page="1"
                    @on-page-changed="
                  (items: any[]) =>
                  [formControls.prodCollection.items =
                    items]
                "
                    :items="config.setting.subContents.prodCollection.props"
                  ></PaginationControl> -->
                </div>
              </template>
            </ControlSlot>
          </section>
        </template>
      </CardExpandPanel>
      <CardExpandPanel title="การ์ดลิ้ง URL">
        <template #content>
          <section id="card-link-from-controls">
            <FileControl
              @file-emitter="(imgUrl: string) => formControls.cardLink.control.bgUrl = imgUrl"
              :storage="formControls.cardLink.control.bgUrl"
              action="image"
            ></FileControl>
            <section name="card-link-bg-img-preview" class="my-2">
              <label class="text-sm font-bold font-sans"
                >รูปภาพพื้นหลัง *ไม่บังคับ*</label
              >
              <v-img
                :src="
                  formControls.cardLink.control.bgUrl ||
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
              @submit="onSubmitFormCardLink"
              type="form"
              :actions="false"
            >
              <FormKit
                v-model="formControls.cardLink.control.title"
                type="text"
                label="กรอกข้อความหัวเรื่อง"
                name="title"
                validation="required|length:10,0"
                :help="helpConfig.lengthLabel(10)"
              ></FormKit>
              <FormKit
                v-model="formControls.cardLink.control.subtitle"
                type="text"
                label="กรอกข้อความหัวข้อย่อย"
                name="subtitle"
                validation="required|length:10,0"
                :help="helpConfig.lengthLabel(10)"
              ></FormKit>
              <FormKit
                v-model="formControls.cardLink.control.linkUrl"
                type="text"
                label="กรอก Link Url ที่ต้องบันทึกไว้"
                name="linkUrl"
                validation="required|url"
              ></FormKit>
              <div class="flex w-auto mx-auto justify-center">
                <FormKit
                  type="submit"
                  :label="
                    formControls.formEditorsTag === 'CARD' ? 'อัปเดต' : 'เพิ่ม'
                  "
                  :disabled="
                    config.setting.subContents.cardLink.props.length >= 6 &&
                    formControls.formEditorsTag !== 'CARD'
                  "
                  help="สามารถเพิ่มได้มากสุด 6 อันเพื่อคง Performance ของเว็บไซต์ไว้"
                ></FormKit>
              </div>
            </FormKit>
          </section>
          <section id="card-link-preview">
            <ControlSlot
              :item-length="config.setting.subContents.cardLink.props.length"
            >
              <template #form-controls>
                <div id="card-link-group">
                  <div
                    :key="i"
                    id="card-link"
                    v-for="(link, i) in config.setting.subContents.cardLink
                      .props"
                  >
                    <h2 class="hr">
                      <span class="hr-text">{{ i + 1 }}</span>
                    </h2>
                    <div name="card-link-img-preview-readonly" class="mb-4">
                      <label
                        for="text-editor-control"
                        class="text-sm font-bold font-sans"
                        >รูปภาพ</label
                      >
                      <v-img
                        :src="link.bgUrl"
                        sizes="32"
                        class="object-cover max-h-64 mt-3"
                      ></v-img>
                    </div>
                    <FormKit
                      v-model="link.title"
                      type="text"
                      label="หัวข้อ"
                      name="title"
                    ></FormKit>
                    <FormKit
                      v-model="link.subtitle"
                      type="text"
                      label="หัวข้อย่อย"
                      name="subtitle"
                      validation="required|length:10,0"
                      :help="helpConfig.lengthLabel(10)"
                    ></FormKit>
                    <FormKit
                      v-model="link.linkUrl"
                      type="text"
                      label="Link Url"
                      name="linkUrl"
                      validation="required|url"
                    ></FormKit>
                    <ActionGroupControl
                      scroll-to-id="card-link-from-controls"
                      @emit-action="(emitter: any) => [onTakeCURDAction(emitter.action, emitter.itemId, config.setting.subContents.cardLink.props, formControls.cardLink.control ), emitter.action === 'EDIT' ? formControls.formEditorsTag = 'CARD' : null]"
                      :item-id="link.id"
                    ></ActionGroupControl>
                  </div>
                  <!--! unused for unexpected behavior between array  -->

                  <!-- <PaginationControl
                    :items-per-page="2"
                    @on-page-changed="
                      (controls: any[]) =>
                        (formControls.cardLink.items = controls)
                    "
                    :items="config.setting.subContents.cardLink.props"
                  >
                  </PaginationControl> -->
                </div>
              </template>
            </ControlSlot>
          </section>
        </template>
      </CardExpandPanel>
    </v-expansion-panels>
    <CardExpand
      :item-preview="false"
      headline="ยินยันการเซตอัปส่วนของ Main Content"
    >
      <template #content>
        <div class="flex justify-center gap-2 flex-col">
          <v-btn @click="onInitialConfig()" class="!btn-primary"
            >ยืนยันการตั้งค่า</v-btn
          >
          <p class="text-slate-500 text-center text-xs font-semibold">
            กดยืนยันการตั้งค่าเพื่อทำการเรนเดอร์ในส่วนของ UI
          </p>
        </div>
      </template>
    </CardExpand>
  </div>
</template>
<style scoped lang="scss"></style>
