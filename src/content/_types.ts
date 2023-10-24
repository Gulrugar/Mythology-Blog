import { z } from "astro:content";

export const paragraph = z.object({
  tag: z.literal("Paragraph"),
  params: z.object({
    text: z.string(),
  }),
});

export const relatedLink = z.object({
  tag: z.literal("RelatedLink"),
  params: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const callout = z.object({
  tag: z.literal("Callout"),
  params: z.object({
    title: z.string(),
    text: z.string(),
  }),
});

export const image = z.object({
  tag: z.literal("ImageBlock"),
  params: z.object({
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    aspectRatio: z.enum(["square", "portrait"]),
  }),
});

export type ImageParamsType = z.infer<typeof image>["params"];
