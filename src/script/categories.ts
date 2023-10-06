import { getCollection, type CollectionEntry } from "astro:content";
import { formatBlogPosts } from "./utils";
import settings from "../data/settings.json";
import { categorySlugs } from "../data/constants";

export function generateGetStaticPathsAsyncFunction(categoryName: string) {
  const getStaticPaths = async ({ paginate }: any) => {
    const blogPosts = await getCollection("blog", ({ data }) => {
      return data.category.some(
        (category: string) => category === categoryName
      );
    });
    const formattedPosts = formatBlogPosts(blogPosts, {
      filterOutDrafts: true,
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
  categorySlug: (typeof categorySlugs)[number];
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
