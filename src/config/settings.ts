type Meta = {
  title: string;
  description: string;
};

export type Settings = {
  "site-data": {
    title: string;
    "contact-email": string;
    // Note: the recommended image size is 1200x630 for both open graph and twitter cards
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  author: {
    name: string;
    image: {
      src: string;
      alt: string;
    };
    bio: string;
    "social-media-accounts": {
      facebook: string;
      instagram: string;
      website: string;
    };
  };
  logo: {
    src: string;
    alt: string;
  };
  "navigation-menu": {
    title: string;
    links: {
      name: string;
      path: string;
      links: {
        name: string;
        path: string;
      }[];
    }[];
  };
  "footer-menu": {
    title: string;
    links: {
      name: string;
      path: string;
      links: {
        name: string;
        path: string;
      }[];
    }[];
  };
  "footer-bottom-links": {
    name: string;
    path: string;
  }[];
  "social-media-accounts": {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  "twitter-handle": string;
  "privacy-policy-link": string;
  meta: {
    index: Meta;
    404: Meta;
    about: Meta;
  };
};

export const settings: Settings = {
  "site-data": {
    title: "Mythical Art",
    "contact-email": "contact@mythical-art.com",
    image: {
      src: "/images/og-twittercard.webp",
      alt: "Mythological artwork depicting a captivating scene from ancient tales.",
      width: 1024,
      height: 537,
    },
  },
  author: {
    name: "Andrew Aguirre",
    image: {
      src: "/images/author.webp",
      alt: "author",
    },
    bio: "<p>Andrew is a writer and editor for Mythical-Art.com. He has been a lifelong fan of mythology, ever since he first read about the exploits of Zeus, Hercules, and the Olympians in grade school. He spends much of his free time scouring the Internet for new fascinating tidbits about these captivating stories.</p>",
    "social-media-accounts": {
      facebook: "",
      instagram: "https://www.instagram.com/devdrew_gulrugar/",
      website: "https://drewsportfolio.com",
    },
  },
  logo: {
    src: "/images/logo.png",
    alt: "logo",
  },
  "navigation-menu": {
    title: "Navigation",
    links: [
      {
        name: "Home",
        path: "/",
        links: [],
      },
      {
        name: "Myths",
        path: "/categories/myths",
        links: [],
      },
      {
        name: "Stories",
        path: "/categories/stories",
        links: [],
      },
      {
        name: "Categories",
        path: "/categories",
        links: [],
      },
    ],
  },
  "footer-menu": {
    title: "Other",
    links: [
      {
        name: "About",
        path: "/about",
        links: [],
      },
      {
        name: "Author",
        path: "/author",
        links: [],
      },
    ],
  },
  "footer-bottom-links": [
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      name: "Terms of Service",
      path: "/terms-of-service",
    },
    {
      name: "Contact Information",
      path: "/contact-information",
    },
  ],
  "social-media-accounts": {
    facebook: "https://www.facebook.com/MythicalArtBlog/",
    twitter: "https://twitter.com/ArtMythical",
    instagram: "https://www.instagram.com/mythicalart5/",
  },
  "twitter-handle": "@ArtMythical",
  "privacy-policy-link":
    "https://www.privacypolicygenerator.info/live.php?token=sogi5PLonPu69VseVlMhyBRqwB8IJAnY",
  meta: {
    index: {
      title: "Mythical Art",
      description:
        "Dive into the captivating world of mythology! Explore the rich tapestry of ancient legends, gods, and heroes that have shaped cultures throughout history. From the mighty Greek gods of Olympus to the enigmatic creatures of Norse mythology, our articles uncover the hidden gems of these timeless stories.",
    },
    "404": {
      title: "Oops! Page Not Found - 404 Error",
      description:
        "We apologize, but it seems you've reached a dead end. The page you're looking for may have been moved, deleted, or never existed. Please navigate back to our homepage or use our site's navigation to find the content you're seeking. If you believe this is an error, feel free to contact us for assistance. Thank you for visiting!",
    },
    about: {
      title: "About Us",
      description:
        "Discover the story behind our passion for mythology. Learn about the team and the inspiration driving our blog. Dive into our mission and commitment to sharing the magic of ancient legends and timeless tales. Get to know us better and embark on a journey through the captivating world of mythology.",
    },
  },
};

import { categories } from "./constants";
import { type FormatBlogPostsOptions } from "../script/utils";

type CategorySettings = {
  title: string;
  description: string;
  banner: string;
  formatOptions: FormatBlogPostsOptions;
  featuredSection: {
    articles?: string[];
  };
};

type categorySectionsType = {
  [key in (typeof categories)[number]]: CategorySettings;
};

export const categorySections: categorySectionsType = {
  Myths: {
    title: "Myths - Category",
    description:
      "A gateway into the fascinating world of ancient legends and tales. Here, we unearth the timeless myths that have been passed down through generations, providing readers with explorations of their origins, characters, and enduring significance. From the heroic exploits of Hercules in Greek mythology to the mystical tales of gods and goddesses in Hindu mythology, we delve deep into the narratives that have shaped cultures and ignited the imagination of humanity.",
    banner: "/images/myths-banner.webp",
    formatOptions: {},
    featuredSection: {},
  },
  Symbols: {
    title: "Symbols - Category",
    description:
      "A treasure trove of ancient and mystical emblems that have played a significant role in mythological narratives throughout history. Here, we delve into the profound meanings and cultural significance behind these symbols, unlocking the hidden stories and wisdom they carry. From the iconic trident of Poseidon to the enigmatic Eye of Horus, we explore symbols that have shaped cultures, beliefs, and legends across the ages.",
    banner: "/images/stories-banner.webp",
    formatOptions: {},
    featuredSection: {},
  },
  Stories: {
    title: "Stories - Category",
    description:
      "Welcome to Stories, where the power of storytelling takes center stage. Here, we delve into a rich tapestry of narratives that inspire, enlighten, and touch the depths of the human spirit. These meaningful stories range from personal anecdotes of triumph and resilience to timeless tales from cultures around the world. In this collection, you'll discover the enduring impact of storytelling as a vehicle for wisdom, empathy, and connection, reminding us of the universal threads that bind us all.",
    banner: "/images/stories-banner.webp",
    formatOptions: {},
    featuredSection: {},
  },
  Hercules: {
    title: "Hercules - Category",
    description:
      "Embark on an epic journey through Greek mythology as we delve into the mesmerizing tale of Hercules and his Twelve Labors. In this captivating category of our blog, we explore the Herculean trials that have captured the imagination of generations. From battling mythical beasts to retrieving legendary treasures, each labor symbolizes strength, courage, and wit.",
    banner: "/images/hercules-banner.webp",
    formatOptions: {
      sort: "new-old",
    },
    featuredSection: {
      articles: [
        "twelve-labors-of-hercules-5",
        "twelve-labors-of-hercules-4",
        "twelve-labors-of-hercules-3",
        "twelve-labors-of-hercules-2",
      ],
    },
  },
};
