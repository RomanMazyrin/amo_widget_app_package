import TemplateRenderHelpers from '../helpers/TemplateRenderHelpers';

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

    loadStyle(src, onload = () => {}) {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = TemplateRenderHelpers.renderWithWidgetData(src, this.widget);
        link.onload = onload;
        document.head.appendChild(link);
    }

    getDomain() {
        return this.widget.system().domain;
    }
}
