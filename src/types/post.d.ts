type ParamsText<T> = {
  tag: T;
  params: {
    text: string;
  };
};

type ParamsTitleText<T> = {
  tag: T;
  params: {
    title: string;
    text: string;
  };
};

type ParamsImage = {
  tag: "Image";
  params: {
    image: {
      src: string;
      alt: string;
    };
    aspectRatio: "square" | "portrait";
  };
};

export type BlogPost = {
  intro: (
    | ParamsText<"Paragraph">
    | ParamsText<"RelatedLink">
    | ParamsTitleText<"Callout">
  )[];
  content: {
    title: string;
    data: (
      | ParamsText<"Paragraph">
      | ParamsText<"RelatedLink">
      | ParamsTitleText<"Callout">
      | ParamsImage
    )[];
  }[];
  outro: {
    params: {
      text: string;
    };
  };
};
