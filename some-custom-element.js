import { BaseClass } from "./base-class.js";

const button = () => {
  const b = document.createElement("button");
  b.textContent = "click!";
  return b;
};

const counter = (val) => {
  const s = document.createElement("span");
  s.textContent = val;
  return s;
};

export class SomeCustomElement extends BaseClass {
  #count;
  #counter;

  constructor() {
    super();
    this.#count = 0;
  }

  connectedCallback() {
    this.addEventListener("click", this);
    this.textContent = " click-count: ... ";

    this.insertAdjacentElement("afterbegin", button());

    this.#counter = counter();
    this.insertAdjacentElement("beforeend", this.#counter);
    this.update();
  }

  // this will be actually a PointerEvent as clicks are a PointerEvent
  handleclick(event) {
    console.log(event);
    this.#count += 1;
    this.update();
  }

  update() {
    this.#counter.textContent = this.#count;
  }
}

customElements.define("some-custom-element", SomeCustomElement);
