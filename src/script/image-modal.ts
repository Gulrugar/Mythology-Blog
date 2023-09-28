import { trapFocus, removeTrapFocus } from "./header-drawer";

class ModalDialog extends HTMLElement {
  moved?: boolean;
  openedBy!: HTMLButtonElement;
  imgNumber: number;
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]')!.addEventListener(
      "click",
      this.hide.bind(this)
    );
    this.querySelector('[id^="ModalLeft-"]')!.addEventListener(
      "click",
      this.scrollThrough.bind(this, "left")
    );
    this.querySelector('[id^="ModalRight-"]')!.addEventListener(
      "click",
      this.scrollThrough.bind(this, "right")
    );

    this.imgNumber = this.querySelectorAll("[data-media-id]").length;

    this.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "Escape":
          this.hide();
          break;
        case "ArrowLeft":
          this.scrollThrough("left");
          break;
        case "ArrowRight":
          this.scrollThrough("right");
          break;
        default:
          break;
      }
    });

    // this.addEventListener("pointerup", (event) => {
    //   if (event.pointerType === "mouse") this.hide();
    // });
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
    trapFocus(this, this.querySelector('[role="document"]') as HTMLElement);
  }

  hide() {
    document.body.classList.remove("overflow-hidden");
    this.removeAttribute("open");
    // removeTrapFocus(this.openedBy);
    removeTrapFocus();
  }

  scrollThrough(direction: "left" | "right") {
    const activeImage = this.querySelector(".active");
    const currentId = activeImage?.getAttribute("data-media-id");

    let nextId;

    if (direction === "left") {
      nextId = Number(currentId) - 1;
      nextId = nextId < 1 ? this.imgNumber : nextId;
    } else if (direction === "right") {
      nextId = Number(currentId) + 1;
      nextId = nextId > this.imgNumber ? 1 : nextId;
    }

    activeImage?.classList.remove("active");
    this.querySelector(`[data-media-id="${nextId}"]`)?.classList.add("active");
  }
}

export class ImageModal extends ModalDialog {
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
