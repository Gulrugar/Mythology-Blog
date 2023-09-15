class StickyHeader extends HTMLElement {
  header!: HTMLElement;
  headerBounds!:
    | Record<string, number>
    | IntersectionObserverEntry["intersectionRect"];
  currentScrollTop!: number;
  preventReveal!: boolean;
  onScrollHandler!: () => void;
  hideHeaderOnScrollUp!: () => void;
  isScrolling!: ReturnType<typeof setTimeout>;
  constructor() {
    super();
  }
  connectedCallback() {
    this.header = document.querySelector(".section-header")!;
    console.log(`offsetHeight: ${this.header.offsetHeight}`);
    this.headerBounds = {};

    this.setHeaderHeight();

    window
      .matchMedia("max-width: 990px")
      .addEventListener("change", this.setHeaderHeight.bind(this));

    this.currentScrollTop = 0;
    this.preventReveal = false;

    this.onScrollHandler = this.onScroll.bind(this);
    this.hideHeaderOnScrollUp = () => (this.preventReveal = true);

    this.addEventListener("preventHeaderReveal", this.hideHeaderOnScrollUp);
    window.addEventListener("scroll", this.onScrollHandler, false);

    this.createObserver();
  }

  disconnectedCallback() {
    this.removeEventListener("preventHeaderReveal", this.hideHeaderOnScrollUp);
    window.removeEventListener("scroll", this.onScrollHandler);
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

    if (
      scrollTop > this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      requestAnimationFrame(this.hide.bind(this));
    } else if (
      scrollTop < this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      if (!this.preventReveal) {
        requestAnimationFrame(this.reveal.bind(this));
      } else {
        window.clearTimeout(this.isScrolling);

        this.isScrolling = setTimeout(() => {
          this.preventReveal = false;
        }, 66);

        requestAnimationFrame(this.hide.bind(this));
      }
    } else if (scrollTop <= this.headerBounds.top) {
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    this.header.classList.add(
      "shopify-section-header-hidden",
      "shopify-section-header-sticky"
    );
  }

  reveal() {
    this.header.classList.add("shopify-section-header-sticky", "animate");
    this.header.classList.remove("shopify-section-header-hidden");
  }

  reset() {
    this.header.classList.remove(
      "shopify-section-header-hidden",
      "shopify-section-header-sticky",
      "animate"
    );
  }
}

customElements.define("sticky-header", StickyHeader);
