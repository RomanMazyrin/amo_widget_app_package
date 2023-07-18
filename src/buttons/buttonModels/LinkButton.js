import ButtonModel from './ButtonModel';

export default class LinkButton extends ButtonModel {
    constructor({
        href = '', target = '', ...base
    } = {}) {
        super(base);

        this.href = href;
        this.target = target;
    }

    onClick() {
        window.open(this.href, this.target).focus();
    }
}
