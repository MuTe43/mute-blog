const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Wajdi",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Dev, Cloud & Cybersecurity ",
    bio: "Tech Enthusiast :).",
    email: "farhatwajdi01@gmail.com",
    linkedin: "wajdi-farhat-292aa4218",
    github: "MuTe43",
    instagram: "",
  },
  projects: [
    {
      name: `to be filled`,
      href: "",
    },
  ],
  // blog setting (required)
  blog: {
    title: "BLOG",
    description: "welcome to my blog lil bro :/ !!",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "mute-blog.vercel.app",
  since: 2025, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // Content is now served from local MDX files in content/posts/

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: false, // No longer needed — content is local
}

module.exports = { CONFIG }
