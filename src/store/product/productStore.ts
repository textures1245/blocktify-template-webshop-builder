import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { CurdDate } from "../types";
import { useConfigComponentStore } from "../../configs/configCPNStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import FormData from "form-data";
import { usePlayerStore } from "../actor/playerStore";

export type Product = {
  id: number;
  name: string;
  desc: string;
  type: string;
  price: number;
  totalSales: number;
  imgSrc: string;
  quantity: number;
  command: string;
  actionStamp: CurdDate;
  onSale?: number;
};

export type ProductBuyResponseError = {
  status: 500 | 403;
  error: 500 | 403;
  messages: {
    error: string;
  };
};

export type ProductBuyResponseSuccess = {
  playerName: string;
  creditBefore: number;
  totalCredit: number;
  warning: string;
};

export const useProductStore = defineStore("productStore", {
  state: () => ({
    productTypes: <string[]>[],
    products: <Product[]>[],
  }),
  getters: {
    getProductTypes: (state) => state.productTypes,
    getProducts: (state) => state.products,
    getDataConfig: (state) => {
      var data = new FormData();

      var config = {
        method: "",
        maxBodyLength: Infinity,
        url: "",
        headers: {
          ...data.getHeaders,
          "x-store-id": useConfigComponentStore().getWebsiteConfig?.storeID,
        },
        data: data,
      };
      return { data, config };
    },
  },
  actions: {
    onInitializeUniqueProductType() {
      const products = this.getProducts;
      const uniqueProdTypeSets = new Set<string>();
      for (const prod of products) {
        uniqueProdTypeSets.add(prod.type);
      }

      this.$state.productTypes = Array.from(uniqueProdTypeSets);
    },

    async deleteProductById(prodId: number | string) {
      let { data, config } = this.getDataConfig;
      config.method = "post";
      config.url = import.meta.env.VITE_DELETE_PRODUCT_API;
      data.append("productId", prodId);
      return axios(config)
        .then((response) => {
          this.products = this.products.reduce(
            (accumulator: Product[], prod) => {
              if (prod.id != prodId) {
                accumulator.push(prod);
              }
              return accumulator;
            },
            []
          );
          return true;
        })
        .catch(function (error) {
          console.error(error);
          return false;
        });
    },

    async buyProduct(
      playerName: string,
      productID: string
    ): Promise<{ status: "success" | "error"; msg: string }> {
      let { data, config } = this.getDataConfig;
      config.method = "post";
      config.url = import.meta.env.VITE_BUY_PRODUCT_API;
      let formData = { playerName, productID };
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }

      return axios(config)
        .then(
          (
            res: AxiosResponse<
              ProductBuyResponseError | ProductBuyResponseSuccess
            >
          ) => {
            let successRes = <ProductBuyResponseSuccess>res.data;
            usePlayerStore().setPlayerWallet(successRes.totalCredit);
            return {
              status: "success" as "success" | "error",
              msg: "คำขอซื้อของคุณถูกดำเนินการเรียบร้อยแล้ว",
            };
          }
        )
        .catch((err: AxiosError<ProductBuyResponseError>) => {
          console.error(err);
          switch (err.response?.data.messages.error) {
            case "Product not found":
              return {
                status: "error" as "success" | "error",
                msg: "ไม่พบสินค้าที่คุณต้องการซื้อ สินค้าอาจถูกลยหรือพิ่งหมด โปรดลองอีกครั้งในภายหลัง",
              };
            case "Player credits is not enough to purchase":
              return {
                status: "error" as "success" | "error",
                msg: "เครดิตของผู้เล่นไม่เพียงพอที่จะซื้อ โปรดเติมเงินแล้วลองใหม่ในภายหลัง",
              };
            case "Out of stock":
              return {
                status: "error" as "success" | "error",
                msg: "สินค้าหมด โปรดลองอีกครั้งในภายหลัง",
              };
            case "Cannot send RCON command":
              return {
                status: "error" as "success" | "error",
                msg: "เกิดความผิดปกติระหว่างการติดต่อทางเซิฟเวอร์ โปรดลองอีกครั้งหรือแจ้งแอดมินเพื่อให้รับทราบ",
              };
            default:
              return {
                status: "error" as "success" | "error",
                msg: "เซฟเวอร์ล่ม โปรดติดต่อผู้ดูแลระบบ",
              };
          }
        });
    },

    async fetchProducts(): Promise<Product[]> {
      let { config } = this.getDataConfig;
      config.method = "get";
      config.url = import.meta.env.VITE_GET_PRODUCT_API;
      return axios(config)
        .then(
          (fetch: {
            data: {
              itemsCount: number;
              products: {
                created_at: string;
                deleted_at: string;
                product_description: string;
                product_id: string;
                product_image_url: string;
                product_name: string;
                product_command: string;
                product_price: string;
                product_quantity: string;
                product_type: string;
                total_sales: string;
                updated_at: string;
              }[];
            };
          }) => {
            this.products = fetch.data.products.map((obj) => ({
              id: parseInt(obj.product_id),
              name: obj.product_name,
              desc: obj.product_description,
              type: obj.product_type,
              price: parseFloat(obj.product_price),
              totalSales: parseInt(obj.total_sales),
              imgSrc: obj.product_image_url,
              command: obj.product_command,
              quantity: parseInt(obj.product_quantity),
              actionStamp: {
                created: new Date(+obj.created_at * 10000),
                updated: obj.updated_at
                  ? new Date(parseInt(obj.updated_at) * 10000)
                  : null,
                deleted: obj.deleted_at
                  ? new Date(parseInt(obj.deleted_at) * 10000)
                  : null,
              },
              onSale: 0,
            }));
            return this.products;
          }
        )
        .catch(function (error) {
          console.error(error);
          return [] as Product[];
        });
    },
    async getProductsWithFilters(
      price: number,
      prodType: string[],
      sortByPopular: boolean,
      sortByDate: boolean
    ): Promise<Product[]> {
      const filteredProds = [];
      for (const prod of this.products) {
        if (
          prodType.length &&
          !prodType.some((type) => prod.type.includes(type))
        ) {
          continue;
        }
        if (price && prod.price >= price) {
          continue;
        }
        filteredProds.push(prod);
      }
      if (sortByPopular && !sortByDate) {
        filteredProds.sort((a, b) => b.totalSales - a.totalSales);
      } else if (sortByDate && !sortByPopular) {
        filteredProds.sort(
          (a, b) =>
            b.actionStamp.created.getTime() - a.actionStamp.created.getTime()
        );
      } else if (sortByDate && sortByPopular) {
        filteredProds.sort((a, b) => {
          if (a.totalSales === b.totalSales) {
            return (
              b.actionStamp.created.getTime() - a.actionStamp.created.getTime()
            );
          }
          return b.totalSales - a.totalSales;
        });
      }
      return filteredProds;
    },
  },
});
