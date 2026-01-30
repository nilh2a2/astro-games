import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { SITE } from "@/config";
import uiStrings from "../content/ui/en.json";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

interface SocialLink {
  name: string;
  href: string;
  linkTitle: string;
}

const iconMap: Record<string, (_props: Props) => Element> = {
  GitHub: IconGitHub,
  X: IconBrandX,
  LinkedIn: IconLinkedin,
  Mail: IconMail,
  WhatsApp: IconWhatsapp,
  Facebook: IconFacebook,
  Telegram: IconTelegram,
  Pinterest: IconPinterest,
};

export const SOCIALS: Social[] = (uiStrings.social.links as SocialLink[]).map(
  link => ({
    name: link.name,
    href: link.href,
    linkTitle: `${SITE.title} ${link.linkTitle}`,
    icon: iconMap[link.name] || IconMail,
  })
);

export const SHARE_LINKS: Social[] = (
  uiStrings.social.share as SocialLink[]
).map(link => ({
  name: link.name,
  href: link.href,
  linkTitle: link.linkTitle,
  icon: iconMap[link.name] || IconMail,
}));
