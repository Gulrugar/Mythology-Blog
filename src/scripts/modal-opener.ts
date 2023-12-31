import { ImageModal } from "./image-modal";

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector("button");

    if (!button) return;
    button.addEventListener("click", () => {
      const modal = document.querySelector(
        this.getAttribute("data-modal") || ""
      ) as ImageModal;
      if (modal) modal.show(button);
    });
  }
}
customElements.define("modal-opener", ModalOpener);
