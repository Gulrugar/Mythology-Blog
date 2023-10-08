import { getCollection, type CollectionEntry } from "astro:content";
import { formatBlogPosts, type FormatBlogPostsOptions } from "./utils";
import { settings } from "../config/settings";
import { type CategorySlugs } from "../config/constants";

export function generateGetStaticPathsAsyncFunction({
  categoryName,
  options,
}: {
  categoryName: string;
  options?: FormatBlogPostsOptions;
}) {
  const getStaticPaths = async ({ paginate }: any) => {
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
  categorySlug,
  props,
}: {
  categorySlug: CategorySlugs;
  props: CategoryPageProps;
}) {
  const { page } = props;
  const {
    url: { prev, next },
    currentPage,
    lastPage,
  } = page || { url: {} };
  const metaData = settings.meta[categorySlug];
  const path = `/categories/${categorySlug}`;

  return {
    page,
    url: { prev, next },
    currentPage,
    lastPage,
    metaData,
    path,
  };
}
