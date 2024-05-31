export default class ButtonModel {
    constructor({
        text = '',
        style = {},
        classname = '',
        widget,
    }) {
        this.text = text;
        this.style = { ...style };
        this.classname = classname;
        this.widget = widget;
    }

    // eslint-disable-next-line class-methods-use-this
    getViewComponent() {
        return null;
    }
}
