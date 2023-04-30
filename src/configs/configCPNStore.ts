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
} from "./configCSS";
import { limit } from "firebase/firestore";

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
    globalConfig: <GlobalConfigCSS>{
      themeColor: "winter",
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
    MainBodyConfig: <MainBodyContainer>{
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
                  image:
                    "https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
                  context: {
                    title: "Title 1",
                    content: "Lorem ipsum dolor sit amet.",
                  },
                },
                {
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
            requires: 3,
            props: [
              {
                title: "Title",
                subtitle: "Subtitle",
                linkUrl: "https://example.com/",
              },
              {
                title: "Title",
                subtitle: "Subtitle",
                linkUrl: "https://example.com/",
              },
              {
                title: "Title",
                subtitle: "Subtitle",
                linkUrl: "https://example.com/",
              },
            ],
          },
          prodCollection: {
            type: "ProductCollectionGrid",
            requires: 2,
            props: [
              {
                sortAction: "HIGHEST_SOLD_OFF",
                limits: 8,
              },
              {
                sortAction: "HIGHEST_PRICE",
                limits: 4,
              },
            ],
          },
        },
      },
      storageContents: [],
    },
    FooterConfig: <FooterContainer>{
      avatar: "rounded",
      background: {
        selected: "color",
        value: "#f0f0f0",
      },
      boxShadow: "2px 2px 5px #ccc",
      position: "absolute",
      webInfo: {
        websiteName: "Website Name",
        infotext:
          "lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip,lorem ipsum dolor sit amet, consectetur adip ",
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
  },
});
