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
  PlayerLogin,
  Configuration,
} from "./configCSS";

import { reactive } from "vue";
import { useDocument } from "vuefire";
import {
  DocumentData,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase.config";
import router from "../routers/routerApp";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    websiteConfig: <WebsiteConfig | null>null,
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
      iconLogoSrc:
        "https://freepngimg.com/save/22407-halloween-pumpkin-hd/512x512",
      themeColor: "halloween",
      websiteName: "Blocktify",
      fontFamily: "Kanit",
      bgColor: "bg-base-300",
      fontSize: "md",
      btnStyle: {
        variant: "text",
        extraClass: [],
      },
    },
    playerLoginConfig: <PlayerLogin>{
      sideImageUrl:
        "https://cdn.dribbble.com/users/966188/screenshots/15283925/media/8b8663dc8f6e6a2fd80a201aec1ffbb6.jpg?compress=1&resize=400x300",
      extraClass: {
        loginPosition: "order-0",
        colorTheme: "from-primary",
      },
    },
    AppBarConfig: <AppBar>{
      avatar: "rounded-full",
      brandImg:
        "https://freepngimg.com/save/22407-halloween-pumpkin-hd/512x512",
      bgImg: {
        isHave: "false",
        src: "https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000",
      },
      glass: true,
    },

    BannerConfig: <Banner>{
      background: {
        selected: "img",
        value:
          "https://images.unsplash.com/photo-1629459322097-a190793bd00b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        opacity: 70,
      },
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
          axis: "vertical",
        },
        bannerText: {
          isShowLogo: true,
          title: "Blocktify",
          subtitle: "WELCOME TO OUT LITTLE TOWN",
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
          avatarSrc:
            "https://www.gamesbap.com/wp-content/uploads/2021/04/Carve-Pumpkin-in-Minecraft.jpg",
          bg: {
            custom: true,
            src: "https://t4.ftcdn.net/jpg/05/29/23/21/360_F_529232184_xllVJCuUPpBqYfMpeCtwZtw27hf9cXOM.jpg",
          },
        },
      },
    },
    HeaderBarConfig: <HeaderBar>{
      contents: {
        carousel: {
          images: [
            "https://cdn.kicksdigital.com/hifiindy.com/2022/10/HI-FI-HALLOWEEN-HAPPENINGS.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyAqi1PE4tqk0-fgsMO6H-Rp6UGf3O5th_0g&usqp=CAU",
          ],
        },
      },
    },
    MainBodyConfig: <MainBodyContainer>reactive({
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
                    "https://www.usmagazine.com/wp-content/uploads/2022/10/Kelly-and-Ryan-Talk-Show-Halloween-Costumes.jpg?quality=55&strip=all",
                  context: {
                    title: "Title 1",
                    content: "Lorem ipsum dolor sit amet.",
                  },
                },
                {
                  id: 1,
                  image:
                    "https://media.mauinow.com/file/mauinow/2022/10/Screen-Shot-2022-10-15-at-3.22.31-PM-793x1024.png",
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
                title: "Link 1",
                subtitle: "Spooky!",
                bgUrl:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaTfa0Rz-nmILJ9ta9rWUOWpT-XExQon131pN6GcqLRvcn1w9oLUhALP40DVKG8iemQfk&usqp=CAU",
                linkUrl: "http://localhost/image",
              },
              {
                id: 1,
                title: "Link 2",
                subtitle: "Spooky!",
                bgUrl:
                  "https://i2-prod.stokesentinel.co.uk/news/stoke-on-trent-news/article595251.ece/ALTERNATES/s1200d/0_831396936.jpg",
                linkUrl: "http://localhost/image",
              },
              {
                id: 2,
                title: "Link 3",
                subtitle: "Spooky!",
                bgUrl:
                  "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2018/10/backlit-black-candle-619420.jpg",
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
          ytVideo: {
            type: "Youtube",
            props: [
              {
                id: 0,
                title: "คลิปนำเสนอ",
                youtubeId: "Cy1Nf0USVak",
              },
            ],
          },
        },
      },
      storageContents: [],
    }),
    FooterConfig: <FooterContainer>{
      bg: {
        isImage: false,
        src: "https://wallpapercave.com/wp/wp2586787.jpg",
      },
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
    getPlayerLoginConfig: (state) => state.playerLoginConfig,
  },
  actions: {
    async saveClientsPhone(phone: string) {
      const docRef = doc(db, "ClientWebshops", this.websiteConfig!.hostName);

      return updateDoc(docRef, {
        phone,
      })
        .then(() => {
          return {
            status: "success" as "success" | "error",
            msg: "Phone ถูกอัปเดตเรียบร้อยแล้ว",
          };
        })
        .catch((err) => {
          console.error(err);
          return {
            status: "error" as "success" | "error",
            msg: "ไม่สามารถอัปเดต Phone ได้โปรดลองใหม่อีกครั้ง",
          };
        });
    },

    async onSetNewConfiguration(): Promise<{
      status: "success" | "error";
      msg: string;
    }> {
      const configuration: Configuration = {
        globalConfig: this.getGlobalConfig,
        storeConfig: this.getStoreConfig,
        playerLoginConfig: this.getPlayerLoginConfig,
        AppBarConfig: this.getAppBarConfig,
        BannerConfig: this.getBannerConfig,
        SideBarConfig: this.getSidebarConfig,
        HeaderBarConfig: this.getHeaderBarConfig,
        MainBodyConfig: this.getMainBodyConfig,
        FooterConfig: this.FooterConfig,
      };

      const converter = {
        toFirestore(data: WebsiteConfig & { configuration: Configuration }) {
          return { ...data };
        },
        fromFirestore(snapshot: DocumentData) {
          return snapshot as WebsiteConfig & { configuration: Configuration };
        },
      };

      const collectionRef = collection(db, "ClientWebshops").withConverter(
        converter
      );

      const document: Partial<
        WebsiteConfig & { configuration: Configuration }
      > = {
        configuration,
      };

      const docRef = doc(collectionRef, this.websiteConfig!.hostName);

      return updateDoc(docRef, document)
        .then(() => {
          return {
            status: "success" as "success" | "error",
            msg: "Configuration ถูกบันทึกเรียบร้อยแล้ว",
          };
        })
        .catch((err) => {
          console.error(err);
          return {
            status: "error" as "success" | "error",
            msg: "ไม่สามารถบันทึกข้อมูลได้โปรดลองใหม่อีกครั้ง",
          };
        });
    },

    async onInitalConfiguration(): Promise<{
      status: "success" | "error" | "info";
      msg: string;
    }> {
      const hostName = window.location.hostname;

      const configDocRef = doc(db, "ClientWebshops", hostName);
      return useDocument<WebsiteConfig & { configuration: Configuration }>(
        configDocRef
      ).promise.value.then((config) => {
        if (config === null) {
          router.push("/client-management-login");
          return {
            status: "info" as "success" | "error" | "info",
            msg: "ยินดีต้อนรับสู่เว็บช็อปของคุณ โปรดล็อกอินตาม StoreID ที่คุณได้มา แล้วเริ่มทำการปรับแต่งเว็บไซต์ของคุณ",
          };
        } else {
          if (config && config.configuration) {
            const state = useConfigComponentStore().$state;
            const { configuration, ...websiteConfig } = config;
            Object.assign(state, {
              websiteConfig,
              ...configuration,
            });
            return {
              status: "success" as "success" | "error" | "info",
              msg: "โหลด Setup เรียบร้อย",
            };
          } else if (config && config.configuration === null) {
            return {
              status: "success" as "success" | "error" | "info",
              msg: "โหลดข้อมูล Domain เรียบร้อยแต่ยังไม่มีการ Configuration",
            };
          } else {
            return {
              status: "error" as "success" | "error" | "info",
              msg: "ตรวจไม่พบหรือยังไม่มีการ Setup ในส่วนของ Configuration กรุณาทำการ Setup ใหม่",
            };
          }
        }
      });
    },

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

    setWebsiteConfig(config: WebsiteConfig) {
      this.websiteConfig = config;
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
      const ytVideoComponents = subContents.ytVideo.props.map((props) => ({
        type: "YouTubeIFrame",
        props,
        area: "col-span-full",
      }));
      return [
        ...mainComponents,
        ...cardLinkComponents,
        ...prodCollectionComponents,
        ...ytVideoComponents,
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
