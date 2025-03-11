export class BaseClass extends HTMLElement {
  // handleEvent captures all events, when the Class instance is used as target in an addEventListener Call
  // e.g. this.addEventListener('click', this);
  //
  // how do I type this kind of dynamic cr*p, without knowing which
  // methods the depending child will provide.
  //
  // Additionally the event type is not known and PointerEvent is e.g. incompatible to Event
  handleEvent(event) {
    this[`handle${event.type}`](event);
  }
}
