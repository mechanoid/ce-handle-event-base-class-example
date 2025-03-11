export class BaseClass extends HTMLElement {
  // how do I type this kind of dynamic crap, without knowing which
  // methods the depending child will provide.
  handleEvent(event) {
    this[`handle${event.type}`](event);
  }
}
