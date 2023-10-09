import { categories } from "./constants";
import { type FormatBlogPostsOptions } from "../script/utils";

export const categorySettings: CategorySettingsType = {
  Myths: {
    title: "Myths - Category",
    description:
      "A gateway into the fascinating world of ancient legends and tales. Here, we unearth the timeless myths that have been passed down through generations, providing readers with explorations of their origins, characters, and enduring significance. From the heroic exploits of Hercules in Greek mythology to the mystical tales of gods and goddesses in Hindu mythology, we delve deep into the narratives that have shaped cultures and ignited the imagination of humanity.",
    banner: "/images/myths-banner.webp",
    formatOptions: {},
  },
  Symbols: {
    title: "Symbols - Category",
    description:
      "A treasure trove of ancient and mystical emblems that have played a significant role in mythological narratives throughout history. Here, we delve into the profound meanings and cultural significance behind these symbols, unlocking the hidden stories and wisdom they carry. From the iconic trident of Poseidon to the enigmatic Eye of Horus, we explore symbols that have shaped cultures, beliefs, and legends across the ages.",
    banner: "/images/stories-banner.webp",
    formatOptions: {},
  },
  Stories: {
    title: "Stories - Category",
    description:
      "Welcome to Stories, where the power of storytelling takes center stage. Here, we delve into a rich tapestry of narratives that inspire, enlighten, and touch the depths of the human spirit. These meaningful stories range from personal anecdotes of triumph and resilience to timeless tales from cultures around the world. In this collection, you'll discover the enduring impact of storytelling as a vehicle for wisdom, empathy, and connection, reminding us of the universal threads that bind us all.",
    banner: "/images/stories-banner.webp",
    formatOptions: {},
  },
  Hercules: {
    title: "Hercules - Category",
    description:
      "Embark on an epic journey through Greek mythology as we delve into the mesmerizing tale of Hercules and his Twelve Labors. In this captivating category of our blog, we explore the Herculean trials that have captured the imagination of generations. From battling mythical beasts to retrieving legendary treasures, each labor symbolizes strength, courage, and wit.",
    banner: "/images/hercules-banner.webp",
    formatOptions: {
      sort: "new-old",
      postsToFilterOut: [
        "twelve-labors-of-hercules-5",
        "twelve-labors-of-hercules-4",
        "twelve-labors-of-hercules-3",
        "twelve-labors-of-hercules-2",
      ],
    },
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
