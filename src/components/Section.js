export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = container;
  }

  // этот метод отвечает за отрисовку всех элементов
  renderItems() {
    // Переберем массив _renderedItems
    this._renderedItems.forEach((item) => {
      this._renderer(item, this); //// вызываем renderer, передав item
    });
  } 

  // этои метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
