// use this to slugify something like a tag or category
import { type CollectionEntry } from "astro:content";

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

export type FormatBlogPostsOptions = {
  filterOutDrafts?: boolean;
  filterOutFuturePosts?: boolean;
  sort?: "new-old" | "old-new" | "random";
  limit?: number;
  postsToFilterOut?: string[];
};

export function formatBlogPosts(
  posts: CollectionEntry<"blog">[],
  options: FormatBlogPostsOptions = {}
): CollectionEntry<"blog">[] {
  const {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sort = "new-old",
    limit = undefined,
    postsToFilterOut = undefined,
  } = options;

  const filteredPosts: CollectionEntry<"blog">[] = posts.reduce(
    (acc: CollectionEntry<"blog">[], post) => {
      const {
        slug,
        data: { date, draft },
      } = post;

      if (postsToFilterOut && postsToFilterOut.includes(slug)) return acc;
      if (filterOutDrafts && draft) return acc;
      if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
      acc.push(post);
      return acc;
    },
    []
  );

  if (sort === "new-old") {
    filteredPosts.sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  }
  if (sort === "old-new") {
    filteredPosts.sort(
      (a, b) =>
        new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
    );
  }
  if (sort === "random") {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // Randomize the order of the posts
  // else {
  //
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
