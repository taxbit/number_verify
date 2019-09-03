<h1 align="center">
<br>
  <img src="https://raw.githubusercontent.com/taxbit/number_verify/master/src/images/phone-sample.jpg" alt="Компонент маскированной формы ввода телефона" width="450">
  Компонент ввода телефона с маскированной частью.
  <br>
</h1>
*Установка:*
    ```html
	git clone https://github.com/taxbit/number_verify.git
	cd number_verify
	npm install
    ```
*Запуск демо сервера:*
    ```html
	npm run dev
    ```
*Сборка product версии:*
    ```html
	npm run build
    ```
## Как использовать
*Параметры:*
    ```js
	const mask = '+7(985)0II-*X-I*';
	const validPhone = '+7(985)012-77-77'
	const phone = new Phone(mask, document.forms.phone, validPhone);
    ```
	

