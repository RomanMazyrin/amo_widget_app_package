export default class ButtonModel {
    constructor({ text = '', style = {}, classname = '' }) {
        this.text = text;
        this.style = { ...style };
        this.classname = classname;
    }

    // eslint-disable-next-line class-methods-use-this
    getViewComponent() {
        return null;
    }
}
