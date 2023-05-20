<script lang="ts">
import CardExpandPanel from "../../components/CardExpandPanel.vue";
import { Product, useProductStore } from "../../store/product/productStore";
import CardExpand from "../../components/CardExpand.vue";
import PaginationControl from "../components/PaginationControl.vue";
import ProductControl from "../components/ProductControl.vue";
import Swal from "sweetalert2";
export default {
  components: { CardExpand, PaginationControl, ProductControl },
  setup() {
    const store = useProductStore();
    return {
      products: store.getProducts,
      productTypes: store.getProductTypes,
      store,
    };
  },

  data() {
    return { itemRenderers: <Product[]>[] };
  },

  methods: {
    onRemoveProduct(prodId: number) {
      Swal.fire({
        title: "คุณแน่ใจใช่ไหมว่าต้องการลบสินค้านี้",
        text: "เมื่อทำการลบแล้วคุณจะไม่สามารถกู้คืนสินค้านี้ได้อีก",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิกแอคชั่น",
        confirmButtonText: "ลบสินค้านี้",
      }).then((result) => {
        if (result.isConfirmed) {
          this.store
            .deleteProductById(prodId)
            .then(() => {
              Swal.fire({
                icon: "success",
                text: "สินค้าถูกลบออกเรียบร้อยแล้ว",
              });
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                text: "มีบางอย่างขัดข้องทำให้ไม่สามารถลบข้อมูล โปรดติดต่อเจ้าหน้าที่",
              });
            });
        }
      });
    },
  },
};
</script>
<template>
  <section>
    <CardExpand :item-preview="false" headline="รายการสินค้า">
      <template #content>
        <div
          id="product-form-controller"
          class="flex justify-between items-center"
        >
          <h1 class="font-semibold">สินค้า</h1>

          <ProductControl
            mode="ADD"
            label-btn="กดเพื่อเพิ่มสินค้า"
          ></ProductControl>
        </div>

        <section id="product-list-previews" class="flex flex-col gap-4 my-6">
          <h2 class="hr">
            <span class="hr-text">
              ทั้งหมด
              {{ products.length }} รายการ
            </span>
          </h2>

          <v-card
            height="160"
            class="grid grid-cols-2"
            id="product-preview"
            v-for="prod in itemRenderers"
          >
            <div id="image-preview">
              <v-img class="h-40" :src="prod.imgSrc"> </v-img>
            </div>
            <v-card-text class="m-auto">
              <div
                id="detail"
                class="flex flex-col items-center justify-center gap-2"
              >
                <div id="context">
                  <h1 class="font-semibold">{{ prod.name }}</h1>
                </div>
                <div id="price-and-quantity" class="text-center text-xs">
                  <p>ราคา: {{ prod.price }}</p>
                  <p>จำนวน: {{ prod.quantity }}</p>
                </div>
                <div class="flex gap-2" id="btn-actions">
                  <v-tooltip location="bottom" text="ลายละเอียด">
                    <template v-slot:activator="{ props }">
                      <ProductControl
                        :mode="'EDIT'"
                        :prod-editor="prod"
                        label-btn=""
                        :custom-btn="true"
                      >
                        <template #custom-btn>
                          <v-btn
                            v-bind="props"
                            class="!btn-info"
                            size="small"
                            icon="mdi-eye-arrow-right-outline"
                          ></v-btn>
                        </template>
                      </ProductControl>
                    </template>
                  </v-tooltip>
                  <v-tooltip location="bottom" text="ลบ">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        @click="onRemoveProduct(prod.id)"
                        size="small"
                        v-bind="props"
                        class="!btn-error"
                        icon="mdi-delete-outline"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <PaginationControl
            @on-page-changed="(items: Product[]) => itemRenderers = items"
            :items="products"
            :items-per-page="5"
          ></PaginationControl>
        </section>
      </template>
    </CardExpand>
  </section>
</template>
<style lang="scss"></style>
