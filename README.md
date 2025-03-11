# Custom Element - Handle Events Base Class - Example

for the sake of typescript understanding this Repo provides a minimal example as
a discussion base for "how do I type such generic JS code properly".

In JS you can rely on certain assumptions, that seem impossible in Typescript.
Like "let the child class decide which events to handle" in this example.

Is there as possible way to express that freedom in Typescript?

./some-custom-element.js depending on a base class

```
export class SomeCustomElement extends BaseClass {
  connectedCallback() {
    // registering the events this class should handle
    this.addEventListener("click", this);
  }
  
  // this will be actually a PointerEvent as clicks are a PointerEvent
  handleclick(event) {
    console.log(event);
    this.#count += 1;
    this.update();
  }
```

./base-class.js

```
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
```

See ./some-custom-element.js and ./base-class.js for implementation details.

## Run the example

```
deno run -A npm:vite
```
