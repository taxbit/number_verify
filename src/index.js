
import "./style.css";

import Phone from './blocks/phone/phone.js';


const mask = '+7(985)0II-*X-I*';
const validPhone = '+7(985)012-77-77'

const phone = new Phone(mask, document.forms.phone, validPhone);




