const mainHeaderNavLinks = document.querySelectorAll<HTMLAnchorElement>(
  "#main-header-nav [data-navLink]"
);
const headerDrawerNavLinks = document.querySelectorAll<
  HTMLAnchorElement | HTMLElement
>("header-drawer [data-navLink]");

function addClassToNavLinks(
  nodeList: NodeListOf<HTMLAnchorElement | HTMLElement>,
  className: string
) {
  if (nodeList.length > 0) {
    for (const node of nodeList) {
      let href: string | null = null;

      if (node instanceof HTMLAnchorElement) {
        href = node.getAttribute("href");
      } else {
        href = node.getAttribute("data-href");
      }

      const pathname = window.location.pathname;

      if (
        (href === "/" && pathname === "/") ||
        (href && pathname.includes(href) && href !== "/")
      ) {
        node.classList.add(className);
        break;
      }
    }
  }
}

addClassToNavLinks(mainHeaderNavLinks, "active");
addClassToNavLinks(headerDrawerNavLinks, "menu-drawer__menu-item--active");
