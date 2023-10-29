export const blurryImageUrl =
  "data:image/gif;charset=utf-8;base64,R0lGODlhDwAEAPUAABIfCxYZCBYhEyQSCCQ5EjQ6NjBHGTpANEpVLU5jKlJ8NGNaU2pzYHB9YV2QJ3yIco1ia4STbIeYbI+YYZaPfZKuWpywf8araIyUn5GXiY6li6iWiqWfoaC6lbCjkKWkqqKtpamqoqOrtq6+pLCxrLOyt7SzuLm/tarEnbDJkLPDtrXLtrTB0rTF2cO6scLAwcDFyMXJyNnYw9LV2tba5tLZ697d4uDh3Ojs7+7t8vDv9PLy8hIfCxIfCxIfCxIfCywAAAAADwAEAEUIRgARcCgwQkWHFChk7FihIweOARdEvPBgQUIMGCFOgACggIALGjVasKiQwMaMDDcmONAQYMEHDBQ2MDhQwoQAEg8gNIhgICAAOw==";

export const categories = [
  "Myths",
  "Symbols",
  "Stories",
  "Hercules",
  "Creatures",
  "Traditions",
] as const;

type Category = (typeof categories)[number];

type ToLowerCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${First extends Uppercase<First> ? Lowercase<First> : First}${Rest}`
  : S;

// type CategorySlugs = "myths" | "stories" | "hercules" ...
export type CategorySlugs = ToLowerCase<Category>;
