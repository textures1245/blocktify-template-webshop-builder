<script lang="ts">
import { ref } from "vue";
import FileControl from "./FileControl.vue";
import { Product, useProductStore } from "../../store/product/productStore";
import { useConfigComponentStore } from "../configCPNStore";
import { CurdDate } from "../../store/types";
import { PropType } from "vue";
import { Timestamp } from "firebase/firestore";
import { QuillEditor } from "@vueup/vue-quill";
import FormData from "form-data";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from "axios";
import Swal from "sweetalert2";

type ProductResponse = {
  data: {
    status: "201" | "401" | "500";
    message: string;
  };
};

export default {
  props: {
    customBtn: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String as PropType<"ADD" | "EDIT">,
      required: true,
    },
    prodEditor: {
      type: Object as PropType<Product>,
    },
    labelBtn: {
      type: String,
      default: "ทำการเพิ่มสินค้า",
    },
  },
  components: { FileControl, QuillEditor },
  setup() {
    const websiteConfig = useConfigComponentStore().getWebsiteConfig;

    const data = new FormData();
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "",
      headers: {
        ...data.getHeaders,
        "x-store-id": websiteConfig!.storeID,
      },
      data,
    };
    return {
      websiteConfig,
      productStore: useProductStore(),
      config,
      data,
    };
  },

  mounted() {
    this.productData = { ...this.onInitializedProduct() };
  },

  data() {
    return {
      dialog: ref(false),
      productTypeConfig: {
        opts: {
          select: "เลือกประเภทสินค้าที่มีอยู่",
          new: "สร้างประเภทสินค้าใหม่",
        },
        value: "select",
      },
      productData: {
        productId: -1,
        productName: "",
        productDescription: "",
        productType: "",
        productPrice: 0,
        productImageUrl: "",
        productQuantity: 0,
        productCommand: "",
      },

      formCommand: {
        itemQuantityCommand: 0,
        itemNameCommand: "",
      },
    };
  },

  methods: {
    onSubmit() {
      // if (!this.validateFormControl(this.productData)) {
      //   return alert(
      //     "ได้โปรดตรวจสอบข้อมูลว่า ได้ทำการกรอกข้อมูลครบ หรือข้อมูลถูกตามเงื่อนไขที่กล่าวมาหรือไม่"
      //   );
      // }

      this.productData = {
        ...this.productData,
        productQuantity: +this.productData.productQuantity,
        productPrice: +this.productData.productPrice,
      };
      console.log(this.productData);

      this.config.url =
        this.mode === "ADD"
          ? import.meta.env.VITE_ADD_PRODUCT_API
          : import.meta.env.VITE_UPDATE_PRODUCT_API;

      //- append key\value to formData
      for (const [key, value] of Object.entries(this.productData)) {
        if (this.mode === "ADD") {
          if (key !== "productId") this.data.append(key, value);
        } else {
          this.data.append(key, value);
        }
      }

      axios(this.config)
        .then((response: ProductResponse) => {
          console.log(response);
          if (response.data) {
            switch (response.data.status) {
              case "201":
                Swal.fire({
                  icon: "success",
                  title: "สินค้าถูกเพิ่มเสร็จสิ้นเรียบร้อยแล้ว",
                });
                break;
              case "401":
                alert(
                  "เกิดข้อผิดผลาด คุณไม่มีสิทธ์ในการกระทำแอคชั่นนี้ โปรดตรวจสอบว่าคุณได้ทำการเข้าสู่ระบบแบบถูกต้อง หรือถ้าไม่ โปรดติดต่อเจ้าหน้าที่"
                );
                break;
              default:
                alert(
                  "เซฟเวอร์มีปัญหา โปรดลองใหม่อีกครั้งในภายหลัง หรือแจ้งเจ้าหน้าที่ให้รับทราบ"
                );
                break;
            }
            this.productStore
              .fetchProducts()
              .then((prods: Product[]) => {
                console.log(prods);
              })
              .catch(() => {
                Swal.fire({
                  icon: "success",
                  title:
                    "ไม่สามารถทำการเรียกข้อมูลสินค้าทั้งหมดได้ โปรดติดต่อผู้ดูแลระบบ",
                });
              });
          }
        })
        .catch(function (error) {
          alert(
            "มีบางอย่างขัดข้อง โปรดลองใหม่อีกครั้งในภายหลัง หรือโปรดแจ้งเจ้าหน้าที่ให้รับทราบ"
          );
          console.error(error);
        });
      this.dialog = false;
      this.clearFormControl();
    },

    onInitializedProduct() {
      if (this.mode === "EDIT") {
        let cmdWords = this.prodEditor!.command.slice(
          this.prodEditor!.command.indexOf(" ") + 1
        )
          .trim()
          .split(" ");
        if (cmdWords) {
          this.formCommand.itemNameCommand = cmdWords[1];
          this.formCommand.itemQuantityCommand = +cmdWords[2];
        }
        return {
          productId: this.prodEditor!.id,
          productName: this.prodEditor!.name,
          productDescription: this.prodEditor!.desc,
          productType: this.prodEditor!.type,
          productPrice: +this.prodEditor!.price,
          productImageUrl: this.prodEditor!.imgSrc,
          productQuantity: +this.prodEditor!.quantity,
          productCommand: this.prodEditor!.command,
        };
      }
      return {
        productId: -1,
        productName: "",
        productDescription: "",
        productType: "",
        productPrice: 0,
        productImageUrl: "",
        productQuantity: 0,
        productCommand: "",
      };
    },

    clearFormControl() {
      this.productData = {
        productId: -1,
        productName: "",
        productDescription: "",
        productType: "",
        productPrice: 0,
        productImageUrl: "",
        productQuantity: 0,
        productCommand: "",
      };
      this.config.url = "";
      this.data = new FormData();
    },

    validateFormControl(obj: Object) {
      return Object.values(obj).every(
        (prop) =>
          (typeof prop === "string" && prop.trim() !== "") ||
          (typeof prop === "number" && prop !== 0)
      );
    },
  },
};
</script>
<template>
  <v-dialog v-model="dialog" class="w-full xl:w-10/12">
    <template v-slot:activator="{ props }">
      <v-btn v-if="!customBtn" class="!btn-primary" v-bind="props">
        {{ labelBtn }}
      </v-btn>
      <div v-bind="props" v-else>
        <slot name="custom-btn"> </slot>
      </div>
    </template>

    <v-card>
      <FormKit type="form" @submit="onSubmit" :actions="false">
        <v-card-text>
          <div class="p-5 grid grid-rows-2 place-self-center mx-auto">
            <div class="grid md:grid-cols-2 place-items-center">
              <div class=" " id="image-control">
                <figure class="mb-5">
                  <v-img
                    class="h-64"
                    :src="
                      productData.productImageUrl ||
                      'https://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/image-preview.png'
                    "
                  ></v-img>
                </figure>
                <FileControl
                  @file-emitter="(imgUrl: string) => productData.productImageUrl = imgUrl"
                  :storage="productData.productImageUrl"
                  action="image"
                ></FileControl>
              </div>
              <div
                id="context"
                class="flex items-center flex-shrink-0 flex-col"
              >
                <FormKit
                  outer-class="grid  place-self-center"
                  type="text"
                  input-class="w-screen h-full"
                  v-model="productData.productName"
                  name="product-name"
                  validation="required"
                  label="ชื่อสินค้า"
                ></FormKit>
                <FormKit
                  type="select"
                  v-model="productTypeConfig.value"
                  :options="productTypeConfig.opts"
                  label="ประเภทสินค้า"
                  select-class="w-screen h-full"
                  input-class="w-screen h-full"
                >
                </FormKit>
                <FormKit
                  v-if="productTypeConfig.value === 'select'"
                  type="select"
                  name="product-type-selected"
                  v-model="productData.productType"
                  input-class="w-screen h-full"
                  :options="productStore.getProductTypes"
                  label="ประเภทสินค้า"
                  help="คุณสามารถเพิ่มประเภทสินค้าได้จากเลือก 'สร้างประเภทสินค้าใหม่'"
                  validation="required"
                ></FormKit>
                <FormKit
                  help="รับเฉพาะตัวภาษาอังกฤษและเว้นวรรคเท่านั้น"
                  v-else
                  v-model="productData.productType"
                  name="new-product-type"
                  input-class="w-screen h-full"
                  type="text"
                  validation="required|alpha_spaces:default"
                  label="กรอกประเภทสินค้า"
                ></FormKit>
                <FormKit
                  type="number"
                  name="product-price"
                  input-class="w-screen h-full"
                  label="ราคาของสินค้า"
                  v-model="productData.productPrice"
                  validation="required"
                ></FormKit>
                <FormKit
                  type="number"
                  v-model="productData.productQuantity"
                  label="จำนวนของสินค้า"
                  min="0"
                  input-class="w-screen h-full"
                  name="product-quantity"
                  validation="required|min:0"
                >
                </FormKit>
                <FormKit
                  v-model="productData.productCommand"
                  help="ชุดค่ำสั่งที่จะถูกรันในเกมส์ โปรดตั้งชื่อให้ตรง และถูกวัตถุประสงค์ของผู้ใช้เพื่อป้องกันความผิดพลาด"
                  validation="required"
                  name="product-command"
                  outer-class="flex flex-col items-center justify-center"
                  input-class="w-screen px-auto h-full mx-auto"
                  help-class="w-8/12"
                  placeholder="give <player_name> diamond 64"
                  label="ตอมแมนของสินค้า (Command)"
                ></FormKit>
                <p class="text-xs font-semibold mb-2">
                  โดยที่ &lt;player_name&gt; คือ parameter ที่ใช้ในการ target
                  ผุ้เล่น
                </p>
              </div>
            </div>
            <div id="product-description">
              <h1>ลายละเอียดสินค้า</h1>
              <QuillEditor
                placeholder="โปรดกรอกข้อมูล"
                contentType="html"
                v-model:content="productData.productDescription"
                theme="snow"
              ></QuillEditor>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="fixed bottom-0 ms-3">
          <div class="grid grid-cols-2">
            <FormKit
              class="!btn-success"
              type="submit"
              :label="mode === 'ADD' ? 'เพิ่มสินค้า' : 'อัปเดตสินค้า'"
            ></FormKit>
            <v-btn class="!btn-error text-white h-3/4" @click="dialog = false"
              >ปิด</v-btn
            >
          </div>
        </v-card-actions>
      </FormKit>
    </v-card>
  </v-dialog>
</template>
<style lang="scss"></style>

<!--! unused command input -->
<!-- <FormKit
                  v-model="formCommand.itemNameCommand"
                  type="text"
                  name="item-name-command"
                  validation="required"
                  label="ชื่อไอเทมคอมแมนของสินค้า"
                  input-class="w-full"
                  help-class="w-9/12"
                  help="ชุดค่ำสั่งที่จะถูกรัน ในฐานะ 'ชื่อไอเทม' ในเกมส์ โปรดตั้งชื่อให้ตรงเพื่อป้องกันความผิดพลาด"
                ></FormKit>
                <FormKit
                  v-model="formCommand.itemQuantityCommand"
                  type="number"
                  name="item-quantity-command"
                  validation="required|max:64|min:0"
                  max="64"
                  min="0"
                  label="ชื่อไอเทมคอมแมนของสินค้า"
                  input-class="!w-full"
                  help-class="w-9/12"
                  help="ชุดค่ำสั่งที่จะถูกรัน ในฐานะ 'จำนวนไอเทม' ในเกมส์ โปรดตั้งจำวนวนให้ตรงเพื่อป้องกันความผิดพลาด"
                ></FormKit> -->
