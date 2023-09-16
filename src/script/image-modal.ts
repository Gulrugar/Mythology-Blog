import { trapFocus, removeTrapFocus } from "./header-drawer";

class ModalDialog extends HTMLElement {
  moved?: boolean;
  openedBy!: HTMLButtonElement;
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]')!.addEventListener(
      "click",
      this.hide.bind(this)
    );

    this.addEventListener("keyup", (event) => {
      if (event.code.toUpperCase() === "ESCAPE") this.hide();
    });

    this.addEventListener("pointerup", (event) => {
      if (event.pointerType === "mouse") this.hide();
    });
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener: HTMLButtonElement) {
    this.openedBy = opener;
    document.body.classList.add("overflow-hidden");
    this.setAttribute("open", "");
    trapFocus(this, this.querySelector('[role="dialog"]') as HTMLElement);
  }

  hide() {
    document.body.classList.remove("overflow-hidden");
    this.removeAttribute("open");
    removeTrapFocus(this.openedBy.closest("img"));
  }
}

class ImageModal extends ModalDialog {
  constructor() {
    super();
  }

  hide() {
    super.hide();
  }

  show(opener: HTMLButtonElement) {
    super.show(opener);
    this.showActiveMedia();
  }

  showActiveMedia() {
    this.querySelectorAll(
      `[data-media-id]:not([data-media-id="${this.openedBy.getAttribute(
        "data-media-id"
      )}"])`
    ).forEach((element) => {
      element.classList.remove("active");
    });
    const activeMedia = this.querySelector(
      `[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`
    ) as HTMLImageElement;

    if (!activeMedia) return;
    activeMedia.classList.add("active");
    activeMedia.scrollIntoView();

    const container = this.querySelector('[role="document"]');
    if (container)
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;
  }
}

customElements.define("image-modal", ImageModal);
