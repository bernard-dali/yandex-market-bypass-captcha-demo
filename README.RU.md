# Демонстрация решения координатной капчи Яндекс с помощью Puppeteer 

Пример наглядно демонстрирует конценцию решения капчи Yandex с посмощью [координатного метода](https://2captcha.com/2captcha-api#coordinates?from=22771395). Капча решается с помощью JavaScript библиотеки Puppeteer. Решение капчи происходит в сервисе [2captcha.com](https://2captcha.com/?from=22771395)

Алгоритм работы программы
1. Изображения капчи и инструкции к ней извлекаются на странице
2. Капча отправляется на сервис [2captcha](https://2captcha.com/?from=22771395) для решения
3. Полученный ответ в виде координат используется на странице. С помощью Puppeteer щелкните по полученным координатам
4. Нажмите на кнопку, чтобы проверить результат

### Использование

1. Клонировать репозиторий
2. Установить зависимость `npm install`
3. Установить 2captcha api key в `index.js` файл
4. Запуск `npm run start`

### Видео:
[![video](./media/cover.png)](./media/Yandex-Captcha-Video-Bypass.mp4)

#### Планируемые особенности:
- [ ] Проверка обновления капчи на странице
- [ ] Обработка неправильного решения капчи