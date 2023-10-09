import { getCollection, type CollectionEntry } from "astro:content";

export type CategoryPageProps = {
  page?: {
    data: CollectionEntry<"blog">[];
    start: number;
    end: number;
    size: number;
    total: number;
    currentPage: number;
    lastPage: number;
    url: {
      current: string;
      next: string | undefined;
      prev: string | undefined;
    };
  };
};
