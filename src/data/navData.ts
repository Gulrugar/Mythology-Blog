interface NavItem {
  name: string;
  path: string;
  links?: {
    name: string;
    path: string;
  }[];
}

const navData: NavItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about/",
    links: [
      {
        name: "AboutSubmenu1",
        path: "/",
      },
      {
        name: "AboutSubmenu2",
        path: "/",
      },
    ],
  },
  {
    name: "Blog",
    path: "/blog/",
  },
  {
    name: "Categories",
    path: "/categories/",
  },
];

export default navData;
