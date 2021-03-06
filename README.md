# Проектная работа 9: Место

### Обзор
* Cервис Mesto - интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.
* Картинки взяты с сервиса unsplash

### Код был создан на базе
* html
* css
* jss

### Особенности задания
* Реализовано диалогвое окно popup c редактируемыми полями "Имя" и "О себе". Окно попапа спозиционировано фиксированно по центру экрана с полупрозрачным фоном позади него
* Изначально попап не виден. Его открытие и закрытие реализовано с помощью правил в js 
* Также реализована возможность редактирования полей попапа. После внесения изменений и нажатия кнопки «Сохранить» информация на странице должна обновляется, а попап автоматически закрывается.
* Реализована форма добавления карточки, которая позволяет добавлять новые карточки на страницу.
* Карточку на странице можно лайкнуть, а также удалить.
* При нажатии на картинку на карточке открывается попап с ней.
* Реализована валидация форм в модальных окнах "Редактировать профиль" и "новое место": показываются ошибки ввода, если хотя бы в одном из полей ввод неправильный - кнопка "Сохранить" не функционирует
* Реализовано закрытие попапа по кнопке Esc и по оверлею
* Карточки создаются при помощи JS
* Установлен webpack
* Данные о пользователе и загруженных карточках приходят с сервера. Используется метод PATCH для обновления инфо о пользователе.
* Через POST запрос реализовано добавление карточек, а через DELETE - удаление карточек
* Для постановки или удаления лайка также используются запросы API: PUT и DELETE 




# Ссылка на проект

 https://myr-irina.github.io/mesto/

 



