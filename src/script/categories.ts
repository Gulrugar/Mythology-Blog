import { getCollection, type CollectionEntry } from "astro:content";
import { formatBlogPosts, type FormatBlogPostsOptions, slugify } from "./utils";
import { categories } from "../config/constants";
import { categorySections } from "../config/settings";
import type { InferGetStaticPropsType, PaginateFunction } from "astro";

export function generateGetStaticPathsAsyncFunction({
  categoryName,
  options,
}: {
  categoryName: (typeof categories)[number];
  options?: FormatBlogPostsOptions;
}) {
  const getStaticPaths = async ({
    paginate,
  }: {
    paginate: PaginateFunction;
  }) => {
    const blogPosts = await getCollection("blog", ({ data }) => {
      return data.category.some(
        (category: string) => category === categoryName
      );
    });
    const formattedPosts = formatBlogPosts(blogPosts, {
      filterOutDrafts: true,
      ...options,
    });

    return paginate(formattedPosts, { pageSize: 24 });
  };

  return getStaticPaths;
}

type CategoryPageProps = {
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

export function generateCategoryPageProps({
  categoryName,
  props,
}: {
  categoryName: (typeof categories)[number];
  props: CategoryPageProps;
}) {
  const { page } = props;
  const {
    url: { prev, next },
    currentPage,
    lastPage,
  } = page || { url: {} };
  const metaData = {
    title: categorySections[categoryName].title,
    description: categorySections[categoryName].description,
  };
  const path = `/categories/${slugify(categoryName)}`;

  return {
    page,
    url: { prev, next },
    currentPage,
    lastPage,
    metaData,
    path,
  };
}
