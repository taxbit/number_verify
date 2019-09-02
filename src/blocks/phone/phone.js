
import './phone.css';
import Item from './item/item.js';


export default class Phone {
    
    constructor(mask, form, validPhone) {
        this.domElement = form;
        this.fields = [];

        mask.split('').forEach(element => {

            let itemClass = ['item'];
            let type = 'input';

            //Выбираем тип элемента и стили для него
            switch (true) {
                //<цифра> - серый блок с введенной цифрой
                case /\d/.test(element):
                    itemClass.push('item__input','item__input_disabled','item__input_shown');
                    break;
            
                //"I" - одиночный инпут для ввода одной цифры
                case /\I/.test(element):
                    itemClass.push('item__input','item__input_enabled');
                    break;
                //"*" - серый блок с символом "●"
                case /(\*)/.test(element):
                    itemClass.push('item__input','item__input_disabled','item__input_hidden');
                    break;
            
                //"X" - серый блок с символом "X"
                case /(\X|\Х)/i.test(element):
                    itemClass.push('item__input','item__input_disabled','item__input_hidden','item__input_hidden_x');
                    break;
                
                //<не цифра> - символ отображается "как есть"
                default:
                        itemClass.push('item__symbol');
                        type = 'div';
                    break;
            }

            let item = document.createElement(type);
            item.classList.add(...itemClass);
            
            //добавляем атрибуты инпутам и значения
            switch (true) {
                case itemClass.includes('item__symbol'): //<не цифра> - символ отображается "как есть"
                    item.textContent = element;
                    break;
            
                case itemClass.includes('item__input_shown'): //<цифра> - серый блок с введенной цифрой
                    item.value = parseInt(element);
                    item.setAttribute('disabled', 'true');
                    break;
            
                case itemClass.includes('item__input_enabled'): //"I" - одиночный инпут для ввода одной цифры
                    item.setAttribute('pattern', '\\d');
                    item.setAttribute('maxlength', '1');
                    item.setAttribute('minlength', '1');
                    item.setAttribute('type', 'text');
                    item.setAttribute('inputmode', 'numeric');
                    item.setAttribute('placeholder', '_');

                    //добавляем обработчики для полей ввода
                    const field = new Item (item, {
                        mouseover: () => {
                            item.classList.add('item__input_hover');
                        },
                        mouseout: () => {
                            item.classList.remove('item__input_hover');
                        },
                        focus: () => {
                            item.classList.add('item__input_active');
                        },
                        focusout: () => {
                            item.classList.remove('item__input_active');
                        },
                        input: (event) => {
                            if (event.target.value == '') { //при удалении поля скрываем ошибку
                                this.errorMsg.classList.remove('phone__error-msg_shown')
                                this.domElement.classList.remove('phone_notvalid')

                            } else if (!/\d/.test(event.target.value)) { //если не цифра - ввод запрещен
                                event.target.value = '';
                            } else if(/\d/.test(event.target.value)) { //если цифра

                                //после ввода цифры перескакиваем на след поле
                                let activeField;
                                this.fields.forEach((field, index) => { 
                                    if (field.domElement.classList.contains('item__input_active')) {
                                        activeField = index;
                                    };
                                })
                                this.fields[activeField+1] && this.fields[activeField+1].domElement.focus();

                                //валидация формы, сравниваем с валидным номером
                                if (this.validate(validPhone)) {
                                    this.errorMsg.classList.remove('phone__error-msg_shown');
                                    this.domElement.classList.remove('phone_notvalid');
                                } else {
                                    this.errorMsg.classList.add('phone__error-msg_shown');
                                    this.domElement.classList.add('phone_notvalid');
                                } 
                            }

                        }
                    });

                    this.fields.push(field); //храним все поля с разрешенным вводом

                    break;

                case itemClass.includes('item__input_hidden_x'): //"X" - серый блок с символом "X"
                    item.setAttribute('value', 'X');
                    item.setAttribute('disabled', 'true');
                    break;
            
                case itemClass.includes('item__input_hidden')://"*" - серый блок с символом "●"
                    item.setAttribute('value', "\u2022");
                    item.setAttribute('disabled', 'true');
                    break;
            }

            this.domElement.appendChild(item);//добавляем очередное поле в форму
        });


        this.errorMsg = document.createElement('div');
        this.errorMsg.textContent = 'Неверный номер, попробуйте еще раз';
        this.errorMsg.classList.add('phone__error-msg');
        
        //блок с сообщением об ошибке показываем под первым полем
        this.domElement.firstElementChild.classList.add('item_first');
        this.domElement.firstElementChild.appendChild(this.errorMsg);

    }

    validate(validPhone) {

        let valid = validPhone.match(/\d+/g).join('').split(''); //оставляем только цифры

        return [...this.domElement.elements].every((element, index) => {
            //если цифры совпадают или поле пустое или поле символ ●/Х - скрываем сообщение об ошибке
            return element.value == valid[index] || element.value == '' || /[^0-9]/.test(element.value) 
        });

    }
}