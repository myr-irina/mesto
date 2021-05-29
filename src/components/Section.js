export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  // этот метод отвечает за отрисовку всех элементов
  renderItems(items) {
   
    // const filterItems = JSON.parse(JSON.stringify(items)).filter(item => {
    //   return item.owner._id === 'ac4481dc04955bbba2f3f0bd';
    // });
   
    items.forEach((item) => {
      this._renderer(item); //// вызываем renderer, передав item
    });
  }

  // этои метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
