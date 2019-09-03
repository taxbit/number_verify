<h1 align="center">
<br>
  <img src="https://raw.githubusercontent.com/taxbit/number_verify/master/src/images/phone-sample.jpg" alt="Компонент маскированной формы ввода телефона" width="450">
  <br>
  Компонент ввода телефона с маскированной частью.
  <br>
</h1>

🎮 Демо: [https://taxbit.github.io/number_verify/](https://taxbit.github.io/number_verify/)


*Установка:*
```
git clone https://github.com/taxbit/number_verify.git
cd number_verify
npm install
```	

*Запуск демо сервера:*
```
npm run dev
```	

*Сборка product версии:*
```
npm run build
```	

## Как использовать
*index.html:*
```
<form name="phone" class="phone"></form>
```	

*index.js:*
```
const mask = '+7(985)0II-*X-I*'; //Маска
const validPhone = '+7(985)012-77-77' //Телефон для валидации
const phone = new Phone(mask, document.forms.phone, validPhone); //document.forms.phone - форма для добавления компонента
```	

*В строке mask:*
```
"I" - одиночный инпут для ввода одной цифры
"X" - серый блок с символом "X"
"*" - серый блок с символом "●"
<цифра> - серый блок с введенной цифрой
<не цифра> - символ отображается "как есть"
```

