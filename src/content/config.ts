import { z, defineCollection } from "astro:content";
import { categories } from "../data/constants";
import { paragraph, relatedLink, callout, image } from "./_types.d";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean(),
    category: z.array(z.enum(categories)),
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
        text: z.string(),
        next_link: z.object({
          text: z.string(),
          url: z.string(),
        }),
      }),
    }),
  }),
});

export const collections = {
  blog,
};
