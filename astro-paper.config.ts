import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://edincitaku.com",
    title: "Edin Citaku",
    description: "Blog of Edin Citaku",
    author: "Edin Citaku",
    profile: "https://github.com/EdinCitaku",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Berlin",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/EdinCitaku" },
    { name: "x", url: "https://x.com/Edin_Citaku" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/edin-citaku-564000127/",
    },
    { name: "mail", url: "mailto:edin.citaku@gmail.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
