// use this to slugify something like a tag or category
import { type CollectionEntry } from "astro:content";
import settings from "../data/settings.json";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
}

interface FormatBlogPostsOptions {
  filterOutDrafts?: boolean;
  filterOutFuturePosts?: boolean;
  sortByDate?: boolean;
  limit?: number;
}

export function formatBlogPosts(
  posts: CollectionEntry<"blog">[],
  options: FormatBlogPostsOptions = {}
): CollectionEntry<"blog">[] {
  const {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = options;

  const filteredPosts: CollectionEntry<"blog">[] = posts.reduce(
    (acc: CollectionEntry<"blog">[], post) => {
      const { date, draft } = post.data;

      if (filterOutDrafts && draft) return acc;
      if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
      acc.push(post);
      return acc;
    },
    []
  );

  if (sortByDate) {
    filteredPosts.sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  }

  // Randomize the order of the posts
  // else {
  //   filteredPosts.sort(() => Math.random() - 0.5);
  // }

  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export function getImages(post: CollectionEntry<"blog">["data"]) {
  let images: {
    src: string;
    alt: string;
  }[] = [];

  images.push(post.image);

  post.article.content.forEach((section) => {
    section.data.forEach((block) => {
      if (block.tag === "ImageBlock") {
        images.push(block.params.image);
      }
    });
  });

  return images;
}

let idCounter = 2;

export function getNextId() {
  return idCounter++;
}

export function resetIdCounter() {
  idCounter = 2;
}
