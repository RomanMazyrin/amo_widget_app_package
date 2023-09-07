import LinkButton from './LinkButton';

export default class WhatsappButton extends LinkButton {
    constructor({ phone, ...base } = {}) {
        super(base);
        this.href = `https://web.whatsapp.com/send?phone=${phone}`;
    }
}
