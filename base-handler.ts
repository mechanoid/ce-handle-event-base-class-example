export abstract class BaseHandler<
  T extends Record<string, (event: Event & { type: keyof T }) => void>,
> extends HTMLElement {
  // generic handleEvent function
  handleEvent<K extends keyof T>(event: Event & { type: K }): void {
    console.log(event);

    const method = this[`handle${event.type}` as keyof this] as
      | T[K]
      | undefined;

    if (typeof method === "function") {
      method.call(this, event);
      return;
    }

    console.error(
      `Method "${
        String(event.type)
      }" is not defined in ${this.constructor.name}`,
    );
  }
}
