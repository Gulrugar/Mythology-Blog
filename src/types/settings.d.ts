type Meta = {
  title: string;
  description: string;
};

export type Settings = {
  "site-data": {
    title: string;
    // Note: the recommended image size is 1200x630 for both open graph and twitter cards
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
  meta: {
    index: Meta;
    myths: Meta;
    symbols: Meta;
  };
};
