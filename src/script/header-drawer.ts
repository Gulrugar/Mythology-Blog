import { StickyHeader } from "./sticky-header";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

// controls the aria-expanded attribute of summary elements including the summary element for mainDetailsToggle
document
  .querySelectorAll<HTMLElement>('[id^="Details-"] summary')
  .forEach((summary) => {
    summary.setAttribute("role", "button");

    const detailsElementOpen = (
      summary.parentNode as HTMLDetailsElement
    ).hasAttribute("open");
    summary.setAttribute("aria-expanded", `${detailsElementOpen}`);

    const detailsElementContentId =
      summary.nextElementSibling?.getAttribute("id");
    if (detailsElementContentId) {
      summary.setAttribute("aria-controls", detailsElementContentId);
    }

    summary.addEventListener("click", (event: MouseEvent) => {
      const summaryElement = event.currentTarget as HTMLElement;
      summaryElement.setAttribute(
        "aria-expanded",
        `${!summaryElement.closest("details")!.hasAttribute("open")}`
      );
    });

    // if (summary.closest("header-drawer")) return;
  });

const trapFocusHandlers: {
  focusin?: (event: FocusEvent) => void;
  focusout?: () => void;
  keydown?: (event: KeyboardEvent) => void;
} = {};

export function trapFocus(
  container: HTMLElement,
  elementToFocus: HTMLElement | null | undefined
) {
  if (!elementToFocus) elementToFocus = container;
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event: FocusEvent) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener("keydown", trapFocusHandlers.keydown!);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener("keydown", trapFocusHandlers.keydown!);
  };

  trapFocusHandlers.keydown = function (event: KeyboardEvent) {
    // If not TAB key return
    if (event.code.toUpperCase() !== "TAB") return;

    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener("focusout", trapFocusHandlers.focusout);
  document.addEventListener("focusin", trapFocusHandlers.focusin);

  elementToFocus.focus();

  if (elementToFocus.tagName === "INPUT") {
    const inputElement = elementToFocus as HTMLInputElement;

    if (
      ["search", "text", "email", "url"].includes(inputElement.type) &&
      inputElement.value
    ) {
      inputElement.setSelectionRange(0, inputElement.value.length);
    }
  }
}

export function removeTrapFocus(
  elementToFocus: HTMLElement | false | null = null
) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin!);
  document.removeEventListener("focusout", trapFocusHandlers.focusout!);
  document.removeEventListener("keydown", trapFocusHandlers.keydown!);

  if (elementToFocus) elementToFocus.focus();
}

class MenuDrawer extends HTMLElement {
  mainDetailsToggle: HTMLDetailsElement;

  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector("details")!;

    this.addEventListener("keyup", this.onKeyUp.bind(this));
    this.addEventListener("focusout", this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll("summary").forEach((summary) => {
      summary.addEventListener("click", this.onSummaryClick.bind(this));
    });

    this.querySelectorAll<HTMLButtonElement>(
      "button:not(.localization-selector)"
    ).forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", this.onCloseButtonClick.bind(this));
    });
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.code.toUpperCase() !== "ESCAPE") return;

    const openDetailsElement = (event.target as HTMLDetailsElement).closest(
      "details[open]"
    ) as HTMLDetailsElement | null;
    if (!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(
          event,
          this.mainDetailsToggle.querySelector("summary")
        )
      : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event: MouseEvent): void {
    const summaryElement = event.currentTarget as HTMLElement;
    const detailsElement = summaryElement.parentNode as HTMLDetailsElement;
    const parentMenuElement = detailsElement.closest(".has-submenu");
    const isOpen = detailsElement.hasAttribute("open");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(
        summaryElement.nextElementSibling as HTMLElement,
        detailsElement.querySelector("button")
      );
      summaryElement.nextElementSibling?.removeEventListener(
        "transitionend",
        addTrapFocus
      );
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) event.preventDefault();
      isOpen
        ? this.closeMenuDrawer(event, summaryElement)
        : this.openMenuDrawer(summaryElement);

      if (window.matchMedia("(max-width: 990px)")) {
        document.documentElement.style.setProperty(
          "--viewport-height",
          `${window.innerHeight}px`
        );
      }
    } else {
      setTimeout(() => {
        detailsElement.classList.add("menu-opening");
        summaryElement.setAttribute("aria-expanded", "true");
        parentMenuElement && parentMenuElement.classList.add("submenu-open");

        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling?.addEventListener(
              "transitionend",
              addTrapFocus
            );
      }, 100);
    }
  }

  openMenuDrawer(summaryElement: HTMLElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add("menu-opening");
    });
    summaryElement.setAttribute("aria-expanded", "true");
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(
    event?: Event,
    elementToFocus: HTMLElement | null | false = false
  ) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove("menu-opening");
    this.mainDetailsToggle.querySelectorAll("details").forEach((details) => {
      details.removeAttribute("open");
      details.classList.remove("menu-opening");
    });
    this.mainDetailsToggle
      ?.querySelectorAll(".submenu-open")
      .forEach((submenu) => {
        submenu.classList.remove("submenu-open");
      });

    document.body.classList.remove(
      `overflow-hidden-${this.dataset.breakpoint}`
    );
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);

    if (event instanceof KeyboardEvent) {
      if (elementToFocus instanceof HTMLElement) {
        elementToFocus.setAttribute("aria-expanded", "false");
      }
    }
  }

  // This is supposed to close menu drawer if its open and the focus is outside of the menu drawer but the this.closeMenuDrawer() but it has guard clauses if no paramaters are passed in so it does nothing (its okay it doesn't seem to work as intended anyway since clicking "outside" of the menu drawer in most places technically isn't outside of the menu drawer)
  onFocusOut(event: FocusEvent) {
    setTimeout(() => {
      if (
        this.mainDetailsToggle.hasAttribute("open") &&
        !this.mainDetailsToggle.contains(document.activeElement)
      )
        this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event: MouseEvent) {
    const detailsElement = (event.currentTarget as HTMLElement).closest(
      "details"
    );
    this.closeSubmenu(detailsElement!);
  }

  closeSubmenu(detailsElement: HTMLDetailsElement) {
    const parentMenuElement = detailsElement.closest(".submenu-open");
    parentMenuElement && parentMenuElement.classList.remove("submenu-open");
    detailsElement.classList.remove("menu-opening");
    detailsElement
      .querySelector("summary")
      ?.setAttribute("aria-expanded", "false");
    removeTrapFocus(detailsElement.querySelector("summary"));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement: HTMLDetailsElement | null) {
    let animationStart: number;

    const handleAnimation = (time: number) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement?.removeAttribute("open");
        const openDetails = detailsElement?.closest(
          "details[open]"
        ) as HTMLDetailsElement | null;
        if (openDetails) {
          trapFocus(openDetails, detailsElement?.querySelector("summary"));
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define("menu-drawer", MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  header!: HTMLElement;

  constructor() {
    super();
  }

  openMenuDrawer(summaryElement: HTMLElement) {
    this.header =
      this.header ||
      (document.querySelector(".section-header") as HTMLElement) ||
      null;

    if (this.header) {
      document.documentElement.style.setProperty(
        "--header-bottom-position",
        `${this.header.getBoundingClientRect().bottom}px`
      );

      this.header.classList.add("menu-open");
    }

    setTimeout(() => {
      this.mainDetailsToggle.classList.add("menu-opening");
    });

    summaryElement.setAttribute("aria-expanded", "true");
    window.addEventListener("resize", this.onResize);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(
    event?: Event,
    elementToFocus: HTMLElement | null | false = false
  ) {
    if (!elementToFocus) return;
    super.closeMenuDrawer(event, elementToFocus);
    if (this.header) {
      this.header.classList.remove("menu-open");
    }
    // stickyHeader START
    const stickyHeader = this.header.querySelector(
      "sticky-header"
    ) as StickyHeader;
    if (stickyHeader) {
      stickyHeader.preventHide = true;
      setTimeout(() => {
        stickyHeader.preventHide = false;
      });
    }
    // stickyHeader END
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    this.header &&
      document.documentElement.style.setProperty(
        "--header-bottom-position",
        `${this.header.getBoundingClientRect().bottom}px`
      );
    document.documentElement.style.setProperty(
      "--viewport-height",
      `${window.innerHeight}px`
    );
  };
}

customElements.define("header-drawer", HeaderDrawer);
