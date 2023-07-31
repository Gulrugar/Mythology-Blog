import { z, defineCollection } from "astro:content";
import categoryData from "../data/categoryData";

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
  }),
});

export const collections = {
  blog,
};
