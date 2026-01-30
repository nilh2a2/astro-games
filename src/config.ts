import uiStrings from "../content/ui/en.json";

const getSiteConfig = () => {
  return {
    website: uiStrings.site.website,
    author: uiStrings.site.author,
    profile: uiStrings.site.profile,
    desc: uiStrings.site.description,
    title: uiStrings.site.title,
    ogImage: uiStrings.site.ogImage,
    lightAndDarkMode: uiStrings.site.lightAndDarkMode,
    dir: uiStrings.site.dir as "ltr" | "rtl" | "auto",
    lang: uiStrings.site.lang,
    timezone: uiStrings.site.timezone,

    // Game-specific settings
    gamesPerPage: 12,
    gamesPerIndex: 8,
    showCategories: true,
    showFeatured: true,
    recentGamesCount: 8,
    featuredCarouselSize: 5,
    singleGameMode: true,

    // Logo settings
    showLogo: true,
    logoPath: "/favicon.svg", // Path to logo file (relative to public directory)
    logoSize: 32, // Logo height in pixels
  } as const;
};

export const SITE = getSiteConfig();
