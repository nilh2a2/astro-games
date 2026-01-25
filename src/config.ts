import uiStrings from '../content/ui/en.json';

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
  } as const;
};

export const SITE = getSiteConfig();
