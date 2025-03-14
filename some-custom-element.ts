import { BaseHandler } from "./base-handler.ts";

const button = () => {
  const b = document.createElement("button");
  b.textContent = "click!";
  return b;
};

const counter = (val: number) => {
  const s = document.createElement("span");
  s.textContent = val.toString();
  return s;
};

interface HandlerMethods {
  [key: string]: (event: Event) => void;
}

export class SomeCustomElement extends BaseHandler<HandlerMethods> {
  #count: number;
  #button?: HTMLButtonElement;
  #counter?: HTMLSpanElement;

  constructor() {
    super();
    this.#count = 0;
  }

  connectedCallback() {
    this.#button = button();

    this.textContent = " click-count: ... ";

    this.insertAdjacentElement("afterbegin", this.#button);

    this.#counter = counter(0) as HTMLSpanElement;
    this.insertAdjacentElement("beforeend", this.#counter);
    this.update();

    // !!!! event handler registration !!!
    this.addEventListener("mouseover", this);
    this.#button.addEventListener("click", this);
  }

  // event handler method definition (named by the convention of `handle${event.type}`)
  handleclick(event: PointerEvent) {
    console.log("clicking...", event);
    this.#count += 1;
    this.update();
  }

  handlemouseover(event: PointerEvent) {
    console.log("hovering...", event);
  }

  update() {
    if (!this.#counter) return;

    this.#counter.textContent = this.#count.toString();
  }
}

customElements.define("some-custom-element", SomeCustomElement);
