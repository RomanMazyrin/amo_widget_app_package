import ButtonModel from './ButtonModel';

export default class RegularButton extends ButtonModel {
    constructor({
        onClick, ...base
    } = {}) {
        super(base);
        this.onClick = (e) => {
            onClick({ e, widget: this.widget });
        };
    }
}
