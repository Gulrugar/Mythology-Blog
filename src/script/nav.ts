const navLinks = document.querySelectorAll<HTMLAnchorElement>("[data-navLink]");

if (navLinks) {
  navLinks.forEach((navLink: HTMLAnchorElement) => {
    if (navLink.getAttribute("href") === window.location.pathname) {
      navLink.classList.add("active");
    }
  });
}
