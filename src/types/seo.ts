import { type CollectionEntry } from "astro:content";

export type SEOProps = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  data?: CollectionEntry<"blog">["data"];
  robots?: boolean;
};
