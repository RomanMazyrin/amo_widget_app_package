export default class WidgetComponent {
    constructor(widget) {
        this.widget = widget;
        this.bindWidgetEvents();
    }

    // eslint-disable-next-line class-methods-use-this
    getWidgetEventsCallbacks() {
        return {};
    }

    bindWidgetEvents() {
        const componentWidgetEventsCallbacks = this.getWidgetEventsCallbacks();
        if (componentWidgetEventsCallbacks) {
            Object.entries(componentWidgetEventsCallbacks).forEach(([event, callback]) => {
                this.widget.on(event, callback);
            });
        }
    }
}
