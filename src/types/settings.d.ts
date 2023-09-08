export type Settings = {
  "site-data": {
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
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
  "nav-data": {
    name: string;
    path: string;
    links: {
      name: string;
      path: string;
    }[];
  }[];
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
};
