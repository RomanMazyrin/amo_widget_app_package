import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';

export default class PhoneField {
    constructor(inputEl, params, { errorMsg = '', errorInputStyle = {} } = {}) {
        this.input = inputEl;
        this.errorMsg = errorMsg;
        this.errorInputStyle = errorInputStyle;

        this.iph = intlTelInput(this.input, params);

        this.msgTag = document.createElement('span');
        this.msgTag.style.color = 'red';
        this.msgTag.style.marginLeft = '10px';
        this.input.after(this.msgTag);
    }

    validate() {
        const isValid = this.isValid();
        if (!isValid) {
            Object.entries(this.errorInputStyle).forEach(([attr, value]) => {
                this.input.style[attr] = value;
            });
            this.msgTag.innerText = this.errorMsg;
            this.msgTag.style.display = '';
        } else {
            this.input.style = {};
            this.msgTag.innerText = '';
            this.msgTag.style.display = 'none';
        }
        return isValid;
    }

    isValid() {
        return this.iph.isValidNumber();
    }

    getNumber() {
        return this.iph.getNumber();
    }
}
