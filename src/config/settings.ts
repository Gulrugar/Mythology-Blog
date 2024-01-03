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
        links: [
          {
            name: "All",
            path: "/categories/myths",
          },
          {
            name: "Hercules",
            path: "/categories/hercules",
          },
          {
            name: "Olympus",
            path: "/categories/olympus",
          },
        ],
      },
      {
        name: "Stories",
        path: "/categories/stories",
        links: [
          {
            name: "All",
            path: "/categories/stories",
          },
          {
            name: "Traditions",
            path: "/categories/traditions",
          },
        ],
      },
      {
        name: "Creatures",
        path: "/categories/creatures",
        links: [],
      },

      {
        name: "Symbols",
        path: "/categories/symbols",
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
