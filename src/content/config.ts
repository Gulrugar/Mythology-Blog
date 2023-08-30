import { z, defineCollection } from "astro:content";
import categoryData from "../data/categoryData";
import { paragraph, relatedLink, callout, image } from "./types.d";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean(),
    author: z.enum(["Jane Doe", "John Doe"]),
    category: z.enum(categoryData),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    article: z.object({
      intro: z.array(z.union([paragraph, relatedLink, callout])),
      content: z.array(
        z.object({
          title: z.string(),
          data: z.array(z.union([paragraph, relatedLink, callout, image])),
        })
      ),
      outro: z.object({
        params: z.object({
          text: z.string(),
        }),
      }),
    }),
  }),
});

export const collections = {
  blog,
};
