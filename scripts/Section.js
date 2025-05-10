export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this.renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
