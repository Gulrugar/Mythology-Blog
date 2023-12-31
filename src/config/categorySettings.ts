import { categories } from "./constants";
import { type FormatBlogPostsOptions } from "../scripts/utils";

export const categorySettings: CategorySettingsType = {
  Myths: {
    title: "Myths - Category",
    description:
      "A gateway into the fascinating world of ancient legends and tales. Here, we unearth the timeless myths that have been passed down through generations, providing readers with explorations of their origins, characters, and enduring significance. From the heroic exploits of Hercules in Greek mythology to the mystical tales of gods and goddesses in Hindu mythology, we delve deep into the narratives that have shaped cultures and ignited the imagination of humanity.",
    banner: "/images/banners/myths-banner.webp",
    formatOptions: {},
  },
  Symbols: {
    title: "Symbols - Category",
    description:
      "A treasure trove of ancient and mystical emblems that have played a significant role in mythological narratives throughout history. Here, we delve into the profound meanings and cultural significance behind these symbols, unlocking the hidden stories and wisdom they carry. From the iconic trident of Poseidon to the enigmatic Eye of Horus, we explore symbols that have shaped cultures, beliefs, and legends across the ages.",
    banner: "/images/banners/symbols-banner.webp",
    formatOptions: {},
  },
  Stories: {
    title: "Stories - Category",
    description:
      "Welcome to Stories, where the power of storytelling takes center stage. Here, we delve into a rich tapestry of narratives that inspire, enlighten, and touch the depths of the human spirit. These meaningful stories range from personal anecdotes of triumph and resilience to timeless tales from cultures around the world. In this collection, you'll discover the enduring impact of storytelling as a vehicle for wisdom, empathy, and connection, reminding us of the universal threads that bind us all.",
    banner: "/images/banners/stories-banner.webp",
    formatOptions: {},
  },
  Hercules: {
    title: "Hercules - Category",
    description:
      "Embark on an epic journey through Greek mythology as we delve into the mesmerizing tale of Hercules and his Twelve Labors. In this captivating category of our blog, we explore the Herculean trials that have captured the imagination of generations. From battling mythical beasts to retrieving legendary treasures, each labor symbolizes strength, courage, and wit.",
    banner: "/images/banners/hercules-banner.webp",
    formatOptions: {
      sort: "old-new",
      postsToFilterOut: [
        "twelve-labors-of-hercules-1",
        "twelve-labors-of-hercules-2",
        "twelve-labors-of-hercules-3",
        "twelve-labors-of-hercules-4",
      ],
    },
  },
  Creatures: {
    title: "Creatures - Category",
    description:
      "Where legends come to life and imagination takes flight! Step into a world where dragons breathe fire, unicorns roam enchanted forests, and mermaids sing their haunting melodies. Here, ancient myths meet modern fascination as we explore the captivating tales and symbolism behind these extraordinary beings. Join us on a journey that transcends time and culture, diving into the heart of folklore and uncovering the influence of mythical creatures on art, literature, and popular culture.",
    banner: "/images/banners/creatures-banner.webp",
    formatOptions: {},
  },
  Traditions: {
    title: "Traditions - Category",
    description:
      "From time-honored rituals and festive celebrations to culinary practices and cultural ceremonies, we delve deep into the heart of what brings communities together. Discover the meaning, history, and evolution of traditions that span across cultures and generations. Let's celebrate the beauty of our shared humanity through the customs that define us.",
    banner: "/images/banners/traditions-banner.webp",
    formatOptions: {},
  },
};

type Settings = {
  title: string;
  description: string;
  banner: string;
  formatOptions: FormatBlogPostsOptions;
};

type CategorySettingsType = {
  [key in (typeof categories)[number]]: Settings;
};
