import siteData from "../data/siteData.json";
import type { CollectionEntry } from "astro:content";

export default function jsonLDGenerator({
  data,
  url,
}: {
  data?: CollectionEntry<"blog">["data"];
  url: URL;
}) {
  if (data) {
    return `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${encodeURI(url.toString())}"
      },
      "headline": "${data.title.replace(/"/g, '\\"')}",
      "description": "${data.description.replace(/"/g, '\\"')}",
      "image": "${data.image.src}",
      "author": {
        "@type": "Person",
        "name": "${data.author.replace(/"/g, '\\"')}",
      },
      "datePublished": "${data.date}"
    }
  </script>`;
  }

  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${siteData.title}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}