import { z, defineCollection } from "astro:content";
import { categories } from "../config/constants";
import { paragraph, relatedLink, callout, image } from "./_types";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.date(),
    draft: z.boolean(),
    category: z.array(z.enum(categories)),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    imageAnchor: z.enum(["top", "center", "bottom"]).optional(),
    article: z.object({
      intro: z.array(z.union([paragraph, relatedLink, callout])),
      content: z.array(
        z.object({
          title: z.string(),
          data: z.array(z.union([paragraph, relatedLink, callout, image])),
        })
      ),
      outro: z.object({
        text: z.string(),
        links: z.object({
          previousArticle: z.object({
            slug: z.string(),
          }),
          nextArticle: z.object({
            slug: z.string(),
          }),
        }),
      }),
    }),
  }),
});

export const collections = {
  blog,
};
