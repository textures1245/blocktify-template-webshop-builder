import { defineStore } from "pinia";
import {
  BaseConfigCSS,
  GlobalConfigCSS,
  AppBar,
  MainBodyContainer,
  HeaderBar,
  FooterContainer,
  Banner,
  Sidebar,
  WebsiteConfig,
  StoreConfig,
} from "./configCSS";

import { reactive } from "vue";

export const useHelpConfigStore = defineStore("useHelpConfigStore", {
  state: () => ({}),
  getters: {},
  actions: {
    lengthLabel(maxLength: number, minLength?: number) {
      if (!minLength) return `ตัวอักษรควรห้ามเกิน ${maxLength} ขึ้นไป`;
      return `ตัวอักษรควรมากกว่า ${maxLength} และ ห้ามเกิน ${maxLength} ขึ้นไป`;
    },
  },
});

export const useConfigComponentStore = defineStore("useConfigComponentStore", {
  state: () => ({
    websiteConfig: <WebsiteConfig>{
      storeID: "webshopTest6",
      hostName: "localhost",
      phone: "0654209589",
    },
    storeConfig: <StoreConfig>{
      highlightProducts: {
        title: "สินค้ายอดฮิต",
        sortAction: "HIGHEST_SOLD_OFF",
        limits: 10,
      },
      filter: {
        requires: ["DATE", "HOT", "PRICE", "TYPE"],
      },
    },
    globalConfig: <GlobalConfigCSS>{
      themeColor: "pastel",
      websiteName: "Blocktify",
      fontFamily: "Kanit",
      bgColor: "bg-base-300",
      fontSize: "md",
      btnStyle: {
        variant: "text",
        extraClass: [],
      },
    },
    AppBarConfig: <AppBar>{
      display: "flex",
      avatar: "rounded",
      background: {
        selected: "color",
        value: "#f0f0f0",
      },
      boxShadow: "2px 2px 5px #ccc",
      position: "prepend",
      gridOpts: {
        cols: 1,
        rows: 1,
      },
      brandImg:
        "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg",
      bgImg: {
        isHave: "false",
        src: "https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000",
      },
      glass: true,
    },

    BannerConfig: <Banner>{
      avatar: "rounded",
      background: {
        selected: "img",
        value:
          "https://images.unsplash.com/photo-1629459322097-a190793bd00b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        opacity: 100,
      },
      boxShadow: "2px 2px 5px #ccc",
      position: "relative",
      contents: {
        required: ["widgetOne", "widgetTwo", "bannerText"],
        widgetOne: {
          iconSrc:
            "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ac3c481f273141736_icon_clyde_black_RGB.png",
          title: "Discord Server",
          subtitle: "Discord URL",
          axis: "vertical",
        },
        widgetTwo: {
          iconSrc:
            "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ac3c481f273141736_icon_clyde_black_RGB.png",
          title: "Discord Server",
          subtitle: "Some Subtitle",
          axis: "horizontal",
        },
        bannerText: {
          isShowLogo: true,
          title: "Website Name",
          subtitle: "Laravel lego sadw  asdw!",
        },
      },
    },
    SideBarConfig: <Sidebar>{
      contents: {
        required: ["playerBadge", "topDonate", "recentDonate"],
        topDonate: {
          limit: 3,
        },
        recentDonate: {
          limit: 5,
        },
        playerBadge: {
          bg: {
            custom: true,
            src: "https://t4.ftcdn.net/jpg/05/29/23/21/360_F_529232184_xllVJCuUPpBqYfMpeCtwZtw27hf9cXOM.jpg",
          },
        },
      },
    },
    HeaderBarConfig: <HeaderBar>{
      avatar: "rounded",
      background: {
        selected: "color",
        value: "#f0f0f0",
      },
      boxShadow: "2px 2px 5px #ccc",
      position: "relative",
      contents: {
        carousel: {
          images: [
            "https://images.unsplash.com/photo-1681238337874-c65010a35603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80",

            "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
          ],
        },
      },
    },
    MainBodyConfig: <MainBodyContainer>reactive({
      display: "grid",
      avatar: "rounded",
      background: {
        selected: "color",
        value: "#f0f0f0",
      },
      boxShadow: "2px 2px 5px #ccc",
      gridOpts: {
        cols: 2,
        rows: 2,
      },

      setting: {
        mainContent: {
          requires: ["BoardNews", "AlertSlideMsgWidget"],
          alertMsg: {
            type: "AlertSlideMsgWidget",
            props: {
              msg: "Lorem ipsum dolor sit amet.",
            },
          },
          boardNews: {
            type: "BoardNews",
            props: {
              news: [
                {
                  id: 0,
                  image:
                    "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
                  context: {
                    title: "Title 1",
                    content: "Lorem ipsum dolor sit amet.",
                  },
                },
                {
                  id: 1,
                  image:
                    "https://images.unsplash.com/photo-1681238337874-c65010a35603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80",
                  context: {
                    title: "Title 2",
                    content: "Lorem ipsum dolor sit amet.",
                  },
                },
              ],
            },
          },
        },
        subContents: {
          requires: ["CardLink", "ProductCollectionGrid"],
          cardLink: {
            type: "CardLink",
            props: [
              {
                id: 0,
                title: "Title 1",
                subtitle: "Subtitle",
                bgUrl:
                  "https://e0.pxfuel.com/wallpapers/1010/712/desktop-wallpaper-minecraft-grass-block-box-dirt-texture-minecraft-minecraft-thumbnail.jpg",
                linkUrl: "http://localhost/image",
              },
              {
                id: 1,
                title: "Title 2",
                subtitle: "Subtitle",
                bgUrl:
                  "https://t4.ftcdn.net/jpg/05/29/23/21/360_F_529232184_xllVJCuUPpBqYfMpeCtwZtw27hf9cXOM.jpg",
                linkUrl: "http://localhost/image",
              },
              {
                id: 2,
                title: "Title 3",
                subtitle: "Subtitle",
                bgUrl:
                  "https://t4.ftcdn.net/jpg/05/29/23/21/360_F_529232184_xllVJCuUPpBqYfMpeCtwZtw27hf9cXOM.jpg",
                linkUrl: "http://localhost/image",
              },
            ],
          },
          prodCollection: {
            type: "ProductCollectionGrid",
            props: [
              {
                id: 0,
                sortAction: "HIGHEST_SOLD_OFF",
                limits: 8,
              },
            ],
          },
        },
      },
      storageContents: [],
    }),
    FooterConfig: <FooterContainer>{
      avatar: "rounded",
      background: {
        selected: "color",
        value: "#f0f0f0",
      },
      boxShadow: "2px 2px 5px #ccc",
      position: "absolute",
      webInfo: {
        aboutContent:
          "ที่ร้านค้าออนไลน์ของเรา เราทุ่มเทเพื่อทำให้ประสบการณ์การช็อปปิ้งของคุณง่ายและสนุกที่สุดเท่าที่จะเป็นไปได้ ตั้งแต่อินเทอร์เฟซที่เรียบง่ายและใช้งานง่ายไปจนถึงการชำระเงินที่รวดเร็วและปลอดภัย เรามีทุกสิ่งที่คุณต้องการในการจับจ่ายอย่างมั่นใจ และด้วยชุมชนนักช็อปและผู้ขายที่ให้การสนับสนุน คุณสามารถเชื่อมต่อ เรียนรู้ และเติบโตในขณะที่คุณซื้อสินค้า มาสำรวจเว็บไซต์ของเราและดูว่าเหตุใดการซื้อสินค้ากับเราจึงเป็นวิธีที่สะดวกและสบายที่สุดในการซื้อสินค้าออนไลน์",
      },
      followProps: {
        requires: [
          {
            action: "youtube",
            linkUrl: "https://www.youtube.com/watch",
          },
          {
            action: "facebook",
            linkUrl: "https://www.youtube.com/watch",
          },
          {
            action: "twitter",
            linkUrl: "https://www.youtube.com/watch",
          },
        ],
      },
    },
  }),
  getters: {
    getStoreConfig: (state) => state.storeConfig,
    getWebsiteConfig: (state) => state.websiteConfig,
    getAppBarConfig: (state) => state.AppBarConfig,
    getHeaderBarConfig: (state) => state.HeaderBarConfig,
    getMainBodyConfig: (state) => state.MainBodyConfig,
    getFooterConfig: (state) => state.FooterConfig,
    getGlobalConfig: (state) => state.globalConfig,
    getBannerConfig: (state) => state.BannerConfig,
    getSidebarConfig: (state) => state.SideBarConfig,
  },
  actions: {
    setNewModifyConfig(
      newConfig: any,
      setOnAction:
        | "GLOBAL"
        | "APP_BAR"
        | "HEADER_BAR"
        | "MAIN_BODY"
        | "FOOTER"
        | "BANNER"
    ) {
      switch (setOnAction) {
        case "GLOBAL":
          this.globalConfig = newConfig;
          break;
        case "APP_BAR":
          this.AppBarConfig = newConfig;
          break;
        case "HEADER_BAR":
          this.HeaderBarConfig = newConfig;
          break;
        case "MAIN_BODY":
          this.MainBodyConfig = newConfig;
          break;
        case "FOOTER":
          this.FooterConfig = newConfig;
          break;
        default:
          throw new Error(
            "ERROR_ACTION: Something wrong while tried to  set the new config, ACTION: " +
              setOnAction
          );
      }
    },

    getInitializedContents(): { type: string; props: object; area: string }[] {
      const { mainContent, subContents } = this.getMainBodyConfig.setting;
      const mainComponents = mainContent.requires.map((type, index) => ({
        type,
        props: this.setProp(type),
        area: this.setArea(type),
      }));
      const cardLinkComponents = subContents.cardLink.props.map((props) => ({
        type: "CardLink",
        props,
        area: "col-span-1 place-self-center",
      }));
      const prodCollectionComponents = subContents.prodCollection.props.map(
        (props) => ({
          type: "ProductCollectionWidget",
          props,
          area: "col-span-full",
        })
      );
      return [
        ...mainComponents,
        ...cardLinkComponents,
        ...prodCollectionComponents,
      ];
    },

    setProp(type: "AlertSlideMsgWidget" | "BoardNews"): any {
      switch (type) {
        case "AlertSlideMsgWidget":
          return this.getMainBodyConfig.setting.mainContent.alertMsg.props;
        default:
          return this.getMainBodyConfig.setting.mainContent.boardNews.props
            .news;
      }
    },

    setArea(type: "AlertSlideMsgWidget" | "BoardNews"): string {
      switch (type) {
        case "AlertSlideMsgWidget":
        case "BoardNews":
          return "col-span-full";
        default:
          return "col-span-full";
      }
    },
  },
});
