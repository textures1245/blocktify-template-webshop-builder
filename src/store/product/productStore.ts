import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { CurdDate } from "../types";
import { useConfigComponentStore } from "../../configs/configCPNStore";
import axios from "axios";
import FormData from "form-data";

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

export const useProductStore = defineStore("productStore", {
  state: () => ({
    productTypes: <string[]>[],
    products: <Product[]>[
      {
        id: 1,
        name: "Product 1",
        desc: "Description for Product 1",
        type: "type1",
        price: 10,
        totalSales: 100,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",
        onSale: 5,
        quantity: 10,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 2,
        name: "Product 2",
        desc: "Description for Product 2",
        type: "type2",
        price: 20,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        totalSales: 200,
        quantity: 10,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 3,
        name: "Product 3",
        desc: "Description for Product 3",
        type: "type3",
        price: 30,
        quantity: 10,

        totalSales: 300,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        onSale: 10,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 4,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        name: "Product 4",
        desc: "Description for Product 4",
        type: "type4",
        quantity: 10,

        price: 40,
        totalSales: 400,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 5,
        name: "Product 5",
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        desc: "Description for Product 5",
        quantity: 10,

        type: "type5",
        price: 50,
        totalSales: 500,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 6,
        name: "Product 6",
        desc: "Description for Product 6",
        quantity: 10,

        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        type: "type6",
        price: 60,
        totalSales: 600,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 7,
        name: "Product 7",
        desc: "Description for Product 7",
        quantity: 10,
        type: "type7",
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        price: 70,
        totalSales: 700,
      },
      {
        id: 8,
        name: "Product 8",
        desc: "Description for Product 8",
        type: "type8",
        quantity: 10,

        price: 80,
        totalSales: 800,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",

        onSale: 15,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 9,
        name: "Product 9",
        desc: "Description for Product 9",
        quantity: 10,

        type: "type9",
        price: 90,
        totalSales: 900,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
      {
        id: 10,
        name: "Product 10",
        desc: "Description for Product 10",
        type: "type10",
        price: 100,
        quantity: 10,

        totalSales: 1000,
        imgSrc:
          "https://img.game8.co/3526948/3d43677a8c7dd9b636e438e12b2f4287.png/show",
        onSale: 20,
        actionStamp: {
          created: new Timestamp(1647677385, 500000000),
          updated: new Timestamp(1647677385, 500000000),
        },
      },
    ],
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
          "x-store-id": useConfigComponentStore().getWebsiteConfig.storeID,
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
    async fetchProducts(): Promise<Product[]> {
      let { data, config } = this.getDataConfig;
      config.method = "get";
      config.url = import.meta.env.VITE_GET_PRODUCT_GET_API;
      return axios(config)
        .then((products: { data: Product[] }) => {
          this.products = products.data;
          console.log(this.products);
          return products.data;
        })
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
            b.actionStamp.created.seconds - a.actionStamp.created.seconds
        );
      } else if (sortByDate && sortByPopular) {
        filteredProds.sort((a, b) => {
          if (a.totalSales === b.totalSales) {
            return (
              b.actionStamp.created.seconds - a.actionStamp.created.seconds
            );
          }
          return b.totalSales - a.totalSales;
        });
      }
      return filteredProds;
    },
  },
});
