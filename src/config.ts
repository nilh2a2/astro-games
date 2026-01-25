export const SITE = {
  website: "https://astro-games.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "Play free games online. No download required. Hundreds of fun games to play instantly.",
  title: "Astro Games",
  ogImage: "astrogames-og.jpg",
  lightAndDarkMode: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

  // Game-specific settings
  gamesPerPage: 12,
  gamesPerIndex: 8,
  showCategories: true,
  showFeatured: true,
  recentGamesCount: 8,
  featuredCarouselSize: 5,
} as const;
