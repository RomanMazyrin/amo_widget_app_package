import ButtonModel from './ButtonModel';

export default class RegularButton extends ButtonModel {
    constructor({
        onClick, ...base
    } = {}) {
        super(base);
        this.onClick = onClick.bind(this);
    }
}
