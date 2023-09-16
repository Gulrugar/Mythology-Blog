export class StickyHeader extends HTMLElement {
  header!: HTMLElement;
  headerBounds!:
    | Record<string, number>
    | IntersectionObserverEntry["intersectionRect"];
  currentScrollTop!: number;
  onScrollHandler!: () => void;
  isScrolling!: ReturnType<typeof setTimeout>;
  preventHide?: boolean;
  onResizeHandler!: () => void;
  isResizing!: ReturnType<typeof setTimeout>;
  preventScrollBehavior?: boolean;
  constructor() {
    super();
  }
  connectedCallback() {
    this.header = document.querySelector(".section-header")!;
    this.headerBounds = {};

    this.setHeaderHeight();

    window
      .matchMedia("max-width: 990px")
      .addEventListener("change", this.setHeaderHeight.bind(this));

    this.currentScrollTop = 0;

    this.onScrollHandler = this.onScroll.bind(this);
    this.onResizeHandler = () => {
      this.preventScrollBehavior = true;
      clearTimeout(this.isResizing);
      this.isResizing = setTimeout(() => {
        this.preventScrollBehavior = false;
      }, 66);
    };

    window.addEventListener("scroll", this.onScrollHandler, false);
    window.addEventListener("resize", this.onResizeHandler, false);

    this.createObserver();
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.onScrollHandler);
    window.removeEventListener("resize", this.onResizeHandler);
  }

  createObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
      this.headerBounds = entries[0].intersectionRect;
      observer.disconnect();
    });

    observer.observe(this.header);
  }

  setHeaderHeight() {
    document.documentElement.style.setProperty(
      "--header-height",
      `${this.header!.offsetHeight}px`
    );
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.preventScrollBehavior) {
      this.currentScrollTop = scrollTop;
      return;
    }

    if (
      scrollTop > this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      // stickyHeader START
      if (this.preventHide) {
        this.currentScrollTop = scrollTop;
        return;
      }
      // stickyHeader END
      requestAnimationFrame(this.hide.bind(this));
    } else if (
      scrollTop < this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      requestAnimationFrame(this.reveal.bind(this));
    } else if (scrollTop <= this.headerBounds.top) {
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    this.header.classList.add("section-header-hidden", "section-header-sticky");
  }

  reveal() {
    this.header.classList.add("section-header-sticky", "animate");
    this.header.classList.remove("section-header-hidden");
  }

  reset() {
    this.header.classList.remove(
      "section-header-hidden",
      "section-header-sticky",
      "animate"
    );
  }
}

customElements.define("sticky-header", StickyHeader);
