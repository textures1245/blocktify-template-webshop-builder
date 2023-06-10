import { ParticlePreset } from "../components/ParticleSet.vue";

//* All the CSS Configuration go here
export type Configuration = {
  globalConfig: GlobalConfigCSS;
  storeConfig: StoreConfig;
  playerLoginConfig: PlayerLogin;
  AppBarConfig: AppBar;
  BannerConfig: Banner;
  SideBarConfig: Sidebar;
  HeaderBarConfig: HeaderBar;
  MainBodyConfig: MainBodyContainer;
  FooterConfig: FooterContainer;
};

export type WebsiteConfig = {
  storeID: string;
  hostName: string;
  domainExpiredDate: Date;
  phone: string | null;
};

export type GlobalConfigCSS = {
  websiteName: string;
  themeColor:
    | "light"
    | "dark"
    | "cupcake"
    | "bumblebee"
    | "emerald"
    | "corporate"
    | "synthwave"
    | "retro"
    | "cyberpunk"
    | "valentine"
    | "halloween"
    | "garden"
    | "forest"
    | "aqua"
    | "lofi"
    | "pastel"
    | "fantasy"
    | "wireframe"
    | "black"
    | "luxury"
    | "dracula"
    | "cmyk"
    | "autumn"
    | "business"
    | "acid"
    | "lemonade"
    | "night"
    | "coffee"
    | "winter";
  bgColor: string;
  fontSize: "sm" | "md" | "lg" | "xl";
  fontFamily: string;
  iconLogoSrc: string;
  btnStyle: {
    variant:
      | "text"
      | "plain"
      | "text"
      | "flat"
      | "elevated"
      | "tonal"
      | "outlined"
      | "plain"
      | undefined;
    extraClass?: string[];
  };
};

export type BaseConfigCSS = {
  avatar: string;
  background: {
    selected: "color" | "img" | "none" | "video";
    opacity?: number;
    value?: string;
  };
  boxShadow?: string;
  position?: string;
};

export type AppBar = {
  avatar: string;
  brandImg: string;
  bgImg: {
    isHave: "true" | "false";
    src?: string;
  };
  glass: boolean;
};

export type Banner = {
  background: {
    selected: "img";
    opacity?: number;
    value?: string;
  };
  particle: {
    preset: ParticlePreset;
    fullscreen: boolean;
  };
  contents: {
    required: ("widgetOne" | "widgetTwo" | "bannerText")[];
    widgetOne: BadgeWidget;
    widgetTwo: BadgeWidget;
    bannerText: HeroContent;
  };
};

export type Sidebar = {
  contents: {
    required: ("playerBadge" | "topDonate" | "recentDonate")[];
    playerBadge: {
      avatarSrc: string;
      bg: {
        custom: boolean;
        src?: string;
      };
    };
    topDonate: {
      limit: number;
    };
    recentDonate: {
      limit: number;
    };
  };
};

export type AlertSlideMsgProp = {
  type: "AlertSlideMsgWidget";
  props: {
    msg: string;
  };
};

export type MainBodyContainer = {
  setting: {
    mainContent: {
      requires: ("AlertSlideMsgWidget" | "BoardNews")[];
      alertMsg: AlertSlideMsgProp;
      boardNews: BoardNewsProp;
    };

    subContents: {
      requires: ("ProductCollectionGrid" | "CardLink" | "Youtube")[];
      prodCollection: ProductCollectionGridProp;
      ytVideo: YoutubeIFrameProps;
      cardLink: CardLinkProp;
    };
  };

  //- for rendering content
  storageContents: MainComponent[];
};

export type HeaderBar = BaseConfigCSS & {
  contents: {
    carousel: CarouselList;
    playerBadge: PlayerBadge;
  };
};

export type FooterContainer = {
  webInfo: WebInfo;
  followProps: FollowProps;
  bg: {
    isImage: boolean;
    src: string | null;
  };
};

export type WebInfo = {
  aboutContent: string;
};

export type FollowProps = {
  requires: {
    action: "youtube" | "facebook" | "twitter" | "discord";
    linkUrl: string;
  }[];
};

export type PlayerLogin = {
  sideImageUrl: string;
  extraClass: {
    loginPosition: string;
    colorTheme: string;
  };
};

//- CPN & Widget Types

export type BadgeWidget = {
  title: string;
  iconSrc?: string;
  subtitle?: string;
  axis: "vertical" | "horizontal";
};

export type HeroContent = {
  isShowLogo: boolean;
  title: string;
  subtitle?: string;
};

export type CarouselList = {
  images: string[];
};

export type PlayerBadge = {
  playerInfo: BadgeWidget;
  loginPopup: any;
};

export type BoardNews = {
  id: number;
  image: string | null;
  context: {
    title: string;
    content: string;
  };
};

export type BoardNewsProp = {
  type: "BoardNews";
  props: {
    news: BoardNews[];
  };
};

export type ProductCollectionGridProp = {
  type: "ProductCollectionGrid";
  props: ProductCollectionGrid[];
};

export type CardLinkProp = {
  type: "CardLink";
  props: CardLink[];
};

export type StoreConfig = {
  highlightProducts: {
    title: string;
    sortAction:
      | "HIGHTEST_PRICE"
      | "HIGHEST_SOLD_OFF"
      | "LOWEST_PRICE"
      | "LOWEST_SOLD_OFF";
    limits: number;
  };
  filter: {
    requires: ("PRICE" | "HOT" | "TYPE" | "DATE")[];
  };
};

export type YoutubeIFrame = {
  id: number;
  title: string;
  youtubeId: string;
};

export type YoutubeIFrameProps = {
  type: "Youtube";
  props: YoutubeIFrame[];
};

export type ProductCollectionGrid = {
  id: number;
  sortAction:
    | "HIGHTEST_PRICE"
    | "HIGHEST_SOLD_OFF"
    | "LOWEST_PRICE"
    | "LOWEST_SOLD_OFF"
    | "CUSTOM";
  limits: number;
};

export type CardLink = {
  id: number;
  bgUrl: string;
  title: string;
  subtitle: string;
  linkUrl: string;
};
export type MainComponent = {
  type: string;
  props: object;
  area: string;
};
