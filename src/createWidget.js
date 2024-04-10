import EventMixin from './EventMixin';
import ObjectUtils from './helpers/ObjectUtils';
import WidgetLifecycleEvents from './WidgetLifecycleEvents';

const buildComponents = (components, widget) => ObjectUtils.objMap(
    components,
    (componentConfig) => {
        const { class: ComponentClass, params } = componentConfig;
        return new ComponentClass(widget, params);
    },
);

const createWidget = (config) => {
    function WIDGET_CONSTRUCTOR() {
        Object.assign(this, EventMixin);
        const self = this;

        self.components = config.components ? buildComponents(config.components, this) : {};

        if (config.events) {
            Object.entries(config.events).forEach(([event, callback]) => {
                self.on(event, callback);
            });
        }

        this.component = (componentName) => this.components[componentName];

        this.renderTmpl = (tmpl = '', data = {}) => this.render(
            { data: tmpl },
            data,
        );

        this.callbacks = {
            render() {
                self.trigger(WidgetLifecycleEvents.EVENT_RENDER, self);
                return true;
            },
            init() {
                self.trigger(WidgetLifecycleEvents.EVENT_INIT, self);
                return true;
            },
            bind_actions() {
                return true;
            },
            settings() {
                self.trigger(WidgetLifecycleEvents.EVENT_SETTINGS, self);
                return true;
            },
            onSave() {
                self.trigger(WidgetLifecycleEvents.EVENT_SAVE, self);
                return true;
            },
            destroy() {
            },
            loadPreloadedData() {
                self.trigger(WidgetLifecycleEvents.EVENT_TAB, self);
                return Promise.resolve({});
            },
            loadElements() {
                return Promise.resolve({});
            },
            linkCard() {
                return Promise.resolve({});
            },
            searchDataInCard() {
                return Promise.resolve({});
            },
            dpSettings() {
                self.trigger(WidgetLifecycleEvents.EVENT_DP, self);
            },
        };

        if (config.afterBuild) {
            config.afterBuild(this);
        }
    }

    return WIDGET_CONSTRUCTOR;
};

export default createWidget;
