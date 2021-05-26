export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  // этот метод отвечает за отрисовку всех элементов
  renderItems(data) {
    // Переберем массив _renderedItems
    if(data) {
      data.forEach((item) => {
        this._renderer(item); //// вызываем renderer, передав item
      });
      return;
    }
    this._renderedItems.forEach((item) => {
      this._renderer(item); //// вызываем renderer, передав item
    });
  } 

  // этои метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
