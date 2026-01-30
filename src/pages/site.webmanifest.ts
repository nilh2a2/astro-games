import type { APIRoute } from "astro";
import { getUiText } from "@/utils/getUiText";
import { SITE } from "@/config";

export const GET: APIRoute = () => {
  const manifest = {
    name: SITE.title,
    short_name: getUiText("site.shortName"),
    description: SITE.desc,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
